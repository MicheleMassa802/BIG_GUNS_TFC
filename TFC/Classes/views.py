import datetime
import operator
from django.shortcuts import get_object_or_404, render
from rest_framework import status

from Classes.models import Class, UserClasses
from Subscriptions.models import Subscription
from accounts.models import user
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView, ListAPIView, \
    ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from Classes.serializers import ClassSerializer, UserSerializer
from rest_framework.authentication import SessionAuthentication

from studios.models import Studio


class ShowStudioClassesView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClassSerializer

    def get(self, request, *args, **kwargs):
        # NOTE: could be related_user = User.objects.get(id=self.kwargs['user_id'])
        # user existance, etc is handled by django
        # print("Self request: ", self.request.user)
        # print("Self.request.name: ", self.request.)
        # print("kwARGS: ", kwargs['studio_name'])
        studio_info = Studio.objects.filter(name=kwargs['studio_name'])[0]
        print(studio_info)
        classes = Class.objects.filter(studio=studio_info)
        print(classes)
        serializer = ClassSerializer(classes, many=True)
        # print(Class.objects.filter(name='test'))
        # Remove those classes whose start time is before datetime.now() or are is_cancelled = True
        # print("Old len of objs: ", len(serializer.data))
        # print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        required_classes = []

        for data in serializer.data:
            """
            Source code link for conversion:
             https://bobbyhadz.com/blog/python-typeerror-not-supported-between-instances-of-datetime-datetime-and-int
            """
            info = {}
            if not (data['start_time'][:10] < datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")[0:10] or
                    data['is_cancelled']):
                # Denotes the case for the objects we need to display to user
                # serializer.data.remove(data) --> WRONG WAY TO DO IT AND DOESN'T REMOVE ANYWAYS LOL
                # Creating cleaned data and stripping out timezone and other irrelevant information from date
                # studio_info = user.objects.filter(id=int(data['studio'])).first()

                info['studio'] = studio_info.name
                info['name'] = data['name']
                info['description'] = data['description']
                info['coach'] = data['coach']
                info['keywords'] = data['keywords']
                info['capacity'] = data['capacity']
                info['start_time'] = data['start_time'][:10] + " " + data['start_time'][11:16]
                info['end_time'] = data['end_time'][:10] + " " + data['end_time'][11:16]
                required_classes.append(info)
            # else:
            # print(data)
        # print("New len of objs: ", len(required_classes))
        # Sort all the classes based on start time earliest to latest
        required_classes.sort(key=lambda x: x['start_time'])
        # print(required_classes)
        # sorted_classes = sorted(required_classes, key=operator.attrgetter('start_time'))
        # print(sorted_classes)
        return Response(required_classes)


class ShowUserClassesHistory(ListAPIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = ClassSerializer
    serializer_user = UserSerializer

    def get(self, request, *args, **kwargs):
        # make sure user is not already subscribed
        is_subbed = Subscription.objects.filter(related_user=request.user).exists()

        if not is_subbed:
            return Response({'message': 'User is not subscribed!'})
            # make sure user is not already subscribed

        # studio_info = Studio.objects.filter(name=str(kwargs['studio_name']))
        classes = Class.objects.filter(id=kwargs['user_id'])
        user_info = str(self.request.user.id)
        # print(user_info)
        users = UserClasses.objects.filter(user=user_info)
        print(users)
        serializer_for_class = ClassSerializer(classes, many=True)
        serializer_for_user = UserSerializer(users, many=True)

        required_classes = []

        for data in serializer_for_user.data:
            # class_details = {}
            info = {}
            class_info_id = data['class_info']  # returns id of class
            class_details = Class.objects.filter(id=int(class_info_id)).first()
            # studio_info = user.objects.filter(id=int(class_details.studio.id)).first()

            info['studio'] = class_details.studio.name
            info['name'] = class_details.name
            info['description'] = class_details.description
            info['coach'] = class_details.coach
            info['keywords'] = class_details.keywords
            info['capacity'] = class_details.capacity
            info['start_time'] = str(class_details.start_time)[:10] + " " + str(class_details.start_time)[11:16]
            info['end_time'] = str(class_details.end_time)[:10] + " " + str(class_details.end_time)[11:16]
            required_classes.append(info)

        # Sort all the classes based on start time earliest to latest
        required_classes.sort(key=lambda x: x['start_time'])

        return Response(required_classes)


class EnrollUserToClasses(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserClasses.objects.all()
    serializer_class = UserSerializer

    # Problem: Can enroll the user to same class again

    # After enrolling in one class, find all classes with that name and enroll user in those instances too
    # Similar concept for removing classes too

    def post(self, request, *args, **kwargs):
        # make sure user is not already subscribed
        is_subbed = Subscription.objects.filter(related_user=request.user).exists()

        if not is_subbed:
            return Response({'message': 'User is not subscribed!'})

        # create a new subscription object using the post data
        # Save the details in serializers
        post_data_copy = request.data.copy()
        # overwrite the sub_start_date to be the current date and user to be the current user
        # post_data_copy[''] = str(datetime.now().date())
        # post_data_copy['user'] = request.user.username
        userClasses_serializer = self.serializer_class(data=post_data_copy)
        # print(self.request.data)

        if not userClasses_serializer.is_valid():
            return Response(userClasses_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # userClasses_serializer.save()
        # print(post_data_copy)
        recent_enrolled_class = Class.objects.filter(id=post_data_copy['class_info'])[0]
        # CODE FOR MULTI ENROLL classes
        if 'modify_future_classes' not in post_data_copy:
            # IMPORTANT! CHECK IF THE USER ALREADY ENROLLED IN THIS CLASS BEFORE (CHECK WITH UNIQUE ID)
            # IF NOT THEN ADD ELSE IGNORE THIS CLASS ADDITION

            # User did not want to bulk enroll in future classes
            # Code for saving single instance if it hasn't started and capacity != 0
            # recent_enrolled_class = Class.objects.filter(id=post_data_copy['class_info'])[0]

            if str(recent_enrolled_class.start_time)[:10] > datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")[0:10] \
                    and recent_enrolled_class.capacity != 0:
                # print(recent_enrolled_class.capacity)
                recent_enrolled_class.capacity -= 1
                super(Class, recent_enrolled_class).save()

                user_obj = UserClasses()
                user_obj.user = self.request.user
                user_obj.class_info = recent_enrolled_class
                user_obj.modify_future_classes = False
                # class_obj = Class.objects.filter(id=recent_enrolled_class.id)[0]
                # Database_obj tries to find the exact same object (with id and what not) to avoid duplicate
                # print("Till here")
                # print(UserClasses.objects.filter(class_info=recent_enrolled_class))
                database_obj = None
                if UserClasses.objects.filter(class_info=recent_enrolled_class):
                    database_obj = UserClasses.objects.filter(class_info=recent_enrolled_class)[0]
                all_objects = list(UserClasses.objects.all())

                if len(all_objects) == 0 or database_obj is None:
                    # print("Hi? 1")
                    super(UserClasses, user_obj).save()
                else:
                    exists = False
                    for obj in all_objects:
                        # print(obj)
                        if database_obj.user == obj.user and database_obj.class_info.id == obj.class_info.id:
                            # print("Umm? 1")
                            exists = True

                            # print(database_obj.class_info.start_time)
                            # print(obj.class_info.start_time)
                    if not exists:
                        # print('TF 1')
                        super(UserClasses, user_obj).save()
                    else:
                        return Response(
                            {'message': f'The user has already previously enrolled in class- '
                                        f'{obj.class_info} with class_id = {obj.class_info.id}! '
                                        f'Please select future class and try again to '
                                        f'bulk enroll'})
                # print(recent_enrolled_class.capacity)
        else:
            # User wants to bulk enroll in future classes

            # Make sure you only enroll in those for which after current_date and also after the recent_class_obj
            print("ADD THIS Case!")
            if post_data_copy['modify_future_classes']:

                # LOOP OVER LIST OF OBJECTS OF THAT CLASS NAME AND ADD THEM IF THEY MATCH THE below condition
                # list_related_classes denotes classes that have the same name as the enrolled class

                # Adding the 1'st class 2 times so we need to remove the recent_enrolled_class.id from the list

                list_related_classes = list(UserClasses.objects.filter(class_info=recent_enrolled_class))
                # print("CUR LEN: ", len(list_related_classes))
                # for obj in list_related_classes:
                #     if obj.id == recent_enrolled_class.id:
                #         # Remove the first occurrence of the class (since we add duplicate)
                #         print("HI")
                #         list_related_classes.remove(obj)
                #         break
                # print("LEN OF CLASSES: ", len(list_related_classes))
                if not list_related_classes:
                    # No class with this name exists in user table so we save this instance for the user.
                    list_classes = list(Class.objects.filter(name=recent_enrolled_class.name))
                    print(list_classes)
                    # for i in range(1, len(list_classes)):
                    #     # print("RECENT_ENROLL_ID: ", recent_enrolled_class.id)
                    #     # print(list_classes[i].id)
                    #     # print(list_classes[i - 1].id)
                    #     # print(UserClasses.objects.contains(list_classes[i - 1]))
                    #     user_objs = UserClasses.objects.all()
                    #     for obj in user_objs:
                    #         if obj.class_info.id == list_classes[i - 1].id or obj.id == list_classes[i].id:
                    #     # if list_classes[i].id == list_classes[i - 1].id or \
                    #     #         UserClasses.objects.contains(list_classes[i - 1]) or \
                    #     #         UserClasses.objects.contains(list_classes[i]):
                    #         # Remove the first occurrence of the class (since we add duplicate)
                    #             print("I REMOVED SHIT")
                    #             list_classes.remove(list_classes[i - 1])

                    # print("NEW_LEN: ", len(list_classes))
                    # print(list_classes)

                    track_of_user_objs = list(UserClasses.objects.filter(user=self.request.user))
                    print("TRACK: ", track_of_user_objs)
                    for class_det in list_classes:
                        added = False
                        # print(class_det.id)
                        # if any of the class-det.id == any of the user's class_info
                        if track_of_user_objs:
                            print("Want to add class :", recent_enrolled_class.name)
                            print("class name :", class_det.name)
                            for user_det in track_of_user_objs:
                                # print("USER_OBJ.ID", user_det.class_info.id)
                                # print("CHECK: ")
                                # if UserClasses.
                                if user_det.class_info.id in [obj.class_info.id for obj in
                                                              UserClasses.objects.filter(id=request.data['user'])]:
                                    pass
                                else:
                                    if not added:
                                        if str(class_det.start_time)[:10] > datetime.datetime.now(). \
                                                                                    strftime("%Y-%m-%d %H:%M:%S")[
                                                                            0:10] and class_det.capacity != 0 and \
                                                str(class_det.id) >= request.data['class_info']:
                                            added = True
                                            super(Class, class_det).save()

                                            user_obj = UserClasses()
                                            user_obj.user = self.request.user
                                            user_obj.class_info = class_det
                                            user_obj.modify_future_classes = False
                                            super(UserClasses, user_obj).save()

                                    # New obj not in class so add it if conditions satisfied
                                # elif class_det.id != user_det.class_info.id and str(class_det.start_time)[
                                #                                               :10] > datetime.datetime.now(). \
                                #         strftime("%Y-%m-%d %H:%M:%S")[0:10] and class_det.capacity != 0 and\
                                #         str(class_det.id) >= request.data['class_info']:
                                #     # print("class_det id-", class_det.id)
                                #     # print("user_det id", user_det.class_info.id)
                                #     print("class name :", class_det.name)
                                #     super(Class, class_det).save()
                                #
                                #     user_obj = UserClasses()
                                #     user_obj.user = self.request.user
                                #     user_obj.class_info = class_det
                                #     user_obj.modify_future_classes = False
                                #     super(UserClasses, user_obj).save()
                        else:
                            # print("dp i come here?")
                            # Since no such object exist, we can add from that class_info onwards
                            # print(request.data)
                            # print("class-", str(class_det.start_time)[:10])
                            # print("today-", datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")[0:10])
                            # print("Want to add class :", recent_enrolled_class.name)
                            # print("class name :", class_det.name)
                            if str(class_det.start_time)[:10] > datetime.datetime.now(). \
                                                                        strftime("%Y-%m-%d %H:%M:%S")[
                                                                0:10] and class_det.capacity != 0 and \
                                    str(class_det.id) >= request.data['class_info']:
                                # Since we don't have any info anyways for that user, we add the info
                                # print("Added -", class_det.id)
                                super(Class, class_det).save()

                                user_obj = UserClasses()
                                user_obj.user = self.request.user
                                user_obj.class_info = class_det
                                user_obj.modify_future_classes = False
                                super(UserClasses, user_obj).save()

                    # for class_det in list_classes:
                    #     class_det.capacity -= 1
                    #     super(Class, class_det).save()
                    #
                    #     user_obj = UserClasses()
                    #     user_obj.user = self.request.user
                    #     user_obj.class_info = class_det
                    #     user_obj.modify_future_classes = False
                    #     super(UserClasses, user_obj).save()

                elif list_related_classes[0].class_info.id == recent_enrolled_class.id:
                    print("I DO THIS!")
                    for i in range(0, len(list_related_classes)):
                        # print(recent_enrolled_class.start_time)
                        if str(list_related_classes[i].class_info.start_time)[:10] > datetime.datetime.now(). \
                                                                                             strftime(
                            "%Y-%m-%d %H:%M:%S")[0:10] and \
                                list_related_classes[i].class_info.capacity != 0:
                            # print(recent_enrolled_class.capacity)
                            list_related_classes[i].class_info.capacity -= 1
                            super(Class, list_related_classes[i].class_info).save()

                            user_obj = UserClasses()
                            user_obj.user = self.request.user
                            user_obj.class_info = list_related_classes[i].class_info
                            user_obj.modify_future_classes = False

                            database_obj = None
                            if UserClasses.objects.filter(class_info=recent_enrolled_class):
                                database_obj = UserClasses.objects.filter(class_info=recent_enrolled_class)[0]
                            all_objects = list(UserClasses.objects.all())

                            if len(all_objects) == 0 or database_obj is None:
                                super(UserClasses, user_obj).save()
                            else:
                                exists = False
                                for obj in all_objects:
                                    # print(obj)
                                    if database_obj.user == obj.user and database_obj.class_info.id == obj.class_info.id:
                                        # print("Umm? 2")
                                        exists = True
                                        # print(database_obj.class_info.start_time)
                                        # print(obj.class_info.start_time)
                                if not exists:
                                    # print('TF 2')
                                    super(UserClasses, user_obj).save()
                                else:
                                    return Response(
                                        {'message': f'The user has already previously enrolled in one of more of the '
                                                    f'classes! '
                                                    f'Please drop the enrolled courses first and try bulk enrolling '
                                                    f'again'})
                            super(UserClasses, user_obj).save()
                else:
                    for i in range(1, len(list_related_classes)):
                        if list_related_classes[i].class_info.id > list_related_classes[i - 1].class_info.id and \
                                str(list_related_classes[i].class_info.start_time)[:10] > datetime.datetime.now(). \
                                                                                                  strftime(
                            "%Y-%m-%d %H:%M:%S")[0:10] and \
                                list_related_classes[i].class_info.capacity != 0:
                            # print(recent_enrolled_class.capacity)
                            list_related_classes[i].class_info.capacity -= 1
                            super(Class, list_related_classes[i].class_info).save()

                            user_obj = UserClasses()
                            user_obj.user = self.request.user
                            user_obj.class_info = list_related_classes[i].class_info
                            user_obj.modify_future_classes = False

                            database_obj = None
                            if UserClasses.objects.filter(class_info=recent_enrolled_class):
                                database_obj = UserClasses.objects.filter(class_info=recent_enrolled_class)[0]
                            all_objects = list(UserClasses.objects.all())
                            if len(all_objects) == 0 or database_obj is None:
                                super(UserClasses, user_obj).save()
                            else:
                                exists = False
                                for obj in all_objects:
                                    # print(obj)
                                    if database_obj.user == obj.user and database_obj.class_info.id == obj.class_info.id:
                                        # print("Umm? 3")
                                        exists = True
                                        # print(database_obj.class_info.start_time)
                                        # print(obj.class_info.start_time)
                                if not exists:
                                    # print('TF 3')
                                    super(UserClasses, user_obj).save()
                                else:
                                    return Response(
                                        {'message': f'The user has already previously enrolled in one of more of the '
                                                    f'classes! '
                                                    f'Please drop the enrolled courses first and try bulk enrolling '
                                                    f'again'})

        return Response(userClasses_serializer.data, status=status.HTTP_201_CREATED)


class DropUserFromClasses(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserClasses.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        # make sure user is not already subscribed
        is_subbed = Subscription.objects.filter(related_user=request.user).exists()

        if not is_subbed:
            return Response({'message': 'User is not subscribed!'})

        post_data_copy = request.data.copy()
        userClasses_serializer = self.serializer_class(data=post_data_copy)
        # userClasses_serializer.save()
        if not userClasses_serializer.is_valid():
            return Response(userClasses_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Code for dropping single instance of class
        class_to_drop = Class.objects.filter(id=post_data_copy['class_info'])[0]

        if 'modify_future_classes' not in post_data_copy:
            # Remove single specified instance of the class
            for user_obj in UserClasses.objects.all():
                if user_obj.class_info.id == class_to_drop.id:
                    # Remove this user_obj
                    UserClasses.objects.filter(class_info=user_obj.class_info).delete()
                    # Increase class capacity by 1 again
                    recently_dropped_class = Class.objects.filter(id=post_data_copy['class_info'])[0]
                    recently_dropped_class.capacity += 1
                    super(Class, recently_dropped_class).save()
        else:
            # Remove multiple future instances of specified class
            recently_dropped_class = None
            if UserClasses.objects.filter(class_info=post_data_copy['class_info']):
                recently_dropped_class = UserClasses.objects.filter(class_info=post_data_copy['class_info'])[0]

            if recently_dropped_class is not None:
                list_userClasses = list(UserClasses.objects.filter(user=self.request.user))
                for user_obj in list_userClasses:
                    if user_obj.class_info.start_time >= recently_dropped_class.class_info.start_time and \
                            user_obj.class_info.id >= recently_dropped_class.class_info.id and \
                            user_obj.class_info.name == recently_dropped_class.class_info.name:
                        # Future occurrence of same class so drop it
                        # Also increase capacity of user_obj class
                        user_obj.class_info.capacity += 1
                        super(Class, user_obj.class_info).save()
                        UserClasses.objects.filter(class_info=user_obj.class_info).delete()
                        # Increase class capacity by 1 again
                        recently_dropped_class.class_info.capacity += 1
                        super(Class, recently_dropped_class.class_info).save()

        # Return the information of the class you're trying to drop out of
        return Response(userClasses_serializer.data, status=status.HTTP_201_CREATED)


class FilterStudioClassView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClassSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [SessionAuthentication]

    def get_queryset(self):

        initial_queryset = Class.objects.filter(studio=self.kwargs['studio_id'])  # full with no filters

        # filtering params
        name = self.request.query_params.get('class_name', None)
        coach = self.request.query_params.get('coach', None)
        date = self.request.query_params.get('date', None)
        initial_time = self.request.query_params.get('initial_time', None)
        ending_time = self.request.query_params.get('ending_time', None)

        if name:
            initial_queryset = initial_queryset.filter(name=name)
        if coach:
            initial_queryset = initial_queryset.filter(coach=coach)

        if initial_time and ending_time and date:
            # note, in the model, the time range of a class should be stored as a pair of times,
            # and if the filters initial_time and ending_time overlap the model's time interval,
            # then the instance should be returned.

            date = datetime.datetime.strptime(date, '%Y-%m-%d').date()

            # input format for time is a HH:MM:SS string
            # we convert the time string to a time object
            initial_time = datetime.datetime.strptime(initial_time, '%H:%M:%S').time()
            ending_time = datetime.datetime.strptime(ending_time, '%H:%M:%S').time()

            # join the date and times to make a datetime object
            initial_datetime = datetime.datetime.combine(date, initial_time)
            ending_datetime = datetime.datetime.combine(date, ending_time)

            initial_queryset = initial_queryset.filter(start_time__lte=initial_datetime, end_time__gte=ending_datetime)

        # serialize data and return data
        return initial_queryset
