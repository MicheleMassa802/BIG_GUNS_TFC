import datetime
from datetime import timedelta

from django.contrib.auth.models import User
from accounts.models import user
from studios.models import Studio
from django.db import models
from django.shortcuts import get_object_or_404

# Create your models here.
"""
WORKOUT_CHOICES = (
    ("Upper-body", "Upper-body"),
    ("Core", "Core"),
    ("Lower-body", "Lower-body"),
    ("Cardio", "Cardio"),
    ("HIIT", "HIIT"),
    ("LIIT", "LIIT"),
)
"""


class Class(models.Model):
    class Meta:
        verbose_name = "Class"
        verbose_name_plural = "Classes"

    studio = models.ForeignKey(to=Studio, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=150)
    coach = models.CharField(max_length=150)
    # instead of wrokout type name it keywords and have list of keywords allowing for multiple keywords like
    # CARDIO AND HITT for 1 class.
    keywords = models.CharField(max_length=150)
    capacity = models.IntegerField()
    start_time = models.DateTimeField(max_length=150, auto_now=False)
    end_time = models.DateTimeField(max_length=150, auto_now=False, )
    end_recursion = models.DateTimeField(max_length=150, auto_now=False)
    is_cancelled = models.BooleanField(default=False)
    cancel_all = models.BooleanField(default=False)
    # Similar to cancel all, add functionality to reactivate_all/uncancel_all (Add functionality)
    reactivate_all = models.BooleanField(default=False)
    edit_all = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Bulk add classes
        if self.id is None:
            # New object so bulk create if possible
            super(Class, self).save(*args, **kwargs)
            last_class_object = Class.objects.last()
            # print("ID of changed: ", last_class_object.id)
            num_days = (last_class_object.end_recursion - last_class_object.start_time).days
            num_weeks = num_days // 7
            # print("Days: ", num_weeks)
            if num_weeks > 0:
                for i in range(0, num_weeks):
                    # Extract latest object
                    last_class_object = Class.objects.last()
                    copy = last_class_object
                    copy.id = copy.id + 1
                    # Add 7 days to each iteration
                    copy.start_time += datetime.timedelta(days=7)
                    copy.end_time += datetime.timedelta(days=7)
                    super(Class, copy).save()
        else:
            # Objective: Find object with the ID and do class edit and other edit operations
            # Save object if any changes were made to edit or cancel fields and
            # Get old class object's info before it was saved
            oldClassObj = Class.objects.filter(id=self.id).first()
            super(Class, self).save(*args, **kwargs)
            # If the recursion date was changed, the following code will add weekly classes to account for this edit
            last_class_object = Class.objects.last()
            # print("ID of changed: ", last_class_object.id)
            num_days = (last_class_object.end_recursion - last_class_object.start_time).days
            num_weeks = num_days // 7
            # print("Days: ", num_weeks)
            if num_weeks > 0:
                for i in range(0, num_weeks):
                    # Extract latest object
                    last_class_object = Class.objects.last()
                    copy = last_class_object
                    copy.id = copy.id + 1
                    # Add 7 days to each iteration
                    copy.start_time += datetime.timedelta(days=7)
                    copy.end_time += datetime.timedelta(days=7)
                    super(Class, copy).save()

            # New info for the edited class
            classObj = Class.objects.filter(id=self.id).first()

            # print("IS CANCELLED: ", classObj.is_cancelled)
            # print("EDIT ALL:", classObj.edit_all)

            # If the user wants to edit information for all other classes of this kind.
            if classObj.edit_all:
                # Find all objects with the name of class (returns the classObj defined above as well)
                list_obj = []
                if oldClassObj.name != classObj.name:
                    # Since if name changed, we want to find them wrt what the old name was
                    list_obj += Class.objects.all().filter(name=oldClassObj.name)
                else:
                    list_obj += Class.objects.all().filter(name=classObj.name)
                for obj in list_obj:
                    # if its id is before the id of classObj.id, remove it because it marks completed or old class and
                    # we don't need to change for them since it will cause issues.
                    if obj.id < classObj.id:
                        list_obj.remove(obj)
                # Since if name changed, we want to find them wrt what the old name was
                print('Count of objects: ', len(list_obj))
                # Change all such objects date value based on new self saved value for that object

                for obj in list_obj:

                    # Change only for those whose date is after the self date
                    # Can't simply reassign obj = classObj

                    # ADD CONDITIONALS TO SEE IF EDIT_ALL OR IF_CANCELLED (MAYBE CONSIDER IF_CANCEL_ALL ?)

                    # Edits for if cancel should be under if_cancelled clause and only change that attribute.
                    # Bulk edits for class properties for future occurances should be under edit_all check
                    # print("obj id", obj.id)
                    # print("New obj name: ", classObj.name)
                    # print("Old obj name: ", obj.name)
                    # print("obj is cancelled", obj.is_cancelled)
                    # print("classObj is cancelled", classObj.is_cancelled)
                    # print("Obj time: ", obj.start_time)
                    # print("Classobj time: ", classObj.start_time)
                    # Do the following for future objects
                    if obj.start_time > classObj.start_time:
                        # print("case __")
                        # Identify which fields can be changed
                        # For now, I reassign every field except cancellation related which is handled separately.
                        obj.studio = classObj.studio
                        obj.name = classObj.name
                        obj.description = classObj.description
                        obj.coach = classObj.coach
                        obj.keywords = classObj.keywords
                        obj.capacity = classObj.capacity
                        # Only change time if it changed from previous value
                        # PROBLEM IS I NEVER CHANGE DATES FOR FUTURE OBJECTS EVEN THOGUH THEY AFTER START_TIME OF 1ST OBJ
                        # THUS, IN BELOW FORLOOP I ADD EXTRA 7 DAYS AND 2ND OBJECT AND ONWARDS WE START FROM 15TH AND NOT 8TH NOV
                        obj.start_time = classObj.start_time
                        obj.end_time = classObj.end_time
                        obj.end_recursion = classObj.end_recursion
                        # obj.is_cancelled = classObj.is_cancelled
                        classObj.edit_all = False
                        obj.edit_all = False
                        # print(obj.edit_all)
                        super(Class, obj).save()
                    else:
                        """
                        Issue is after 1st class if i push 2nd class onwards to start next month from 1st Nov,
                        because all dates don't satisfy condition, we put for completed and all classes date to
                        1st Dec and then add dates. This is incorrect because instead of 1st Nov for 2nd class,
                        i get 8th Nov since it calculates in below for-loop from list_obj[i - 1] onwards which
                        was set to 1st Dec because of else case code.

                        Solution: check notion
                        """
                        objs_to_change = []
                        # classObj has a time changed to future i.e rescheduled for future classes
                        # (so reassign) based on current classObj time + 7 days.
                        # In this loop we will simply assign all objects to same day as new future date
                        obj.start_time = classObj.start_time
                        obj.end_time = classObj.end_time
                        obj.end_recursion = classObj.end_recursion
                        # Save new dates for each of such objects in Model DB
                        super(Class, obj).save()
                        print("Obj time: ", obj.start_time)
                        print("Classobj time: ", classObj.start_time)
                # Remove those objects from list_obj whose date is after end recursion date of latest edited object?
                # Reset the classObj edit_all property to False again
                super(Class, classObj).save()

                # classObj has a time changed to future i.e rescheduled for future classes
                # (so reassign) based on current classObj time + 7 days
                print("New len: ", len(list_obj))
                for i in range(1, len(list_obj)):
                    # PROBLEM: Dates are messed up and don't update for future object dates when current object
                    # date is after the latest object of that class type. aLSO ends up making extra copies
                    # print("i WORK")
                    # Do + 7 days for each of the objects except 1st object.

                    list_obj[i].start_time = list_obj[i - 1].start_time + datetime.timedelta(days=7)
                    list_obj[i].end_time = list_obj[i - 1].end_time + datetime.timedelta(days=7)
                    # SAVE NEW CHANGES
                    super(Class, list_obj[i]).save()
                    # print("DATEY: ", list_obj[i].start_time)

            if classObj.cancel_all:
                # Objective: Mark all such objects as cancelled.
                # Find all objects with the name of class (returns the classObj defined above as well)
                classObj.is_cancelled = True
                super(Class, classObj).save()
                list_obj = Class.objects.all().filter(name=classObj.name)
                # print('Count of objects: ', len(list_obj))
                # Change all such objects date value based on new self saved value for that object

                for obj in list_obj:
                    # Change only for those whose date is after the self date
                    # print("obj id", obj.id)
                    # print("obj is cancelled", obj.is_cancelled)
                    # print("classObj is cancelled", classObj.is_cancelled)
                    if obj.start_time > classObj.start_time:
                        # print("case cancelled__")
                        obj.is_cancelled = True
                        classObj.cancel_all = False
                        # print(classObj.cancel_all)
                        super(Class, obj).save()
                # Reset the classObj cancel_all property to False again
                super(Class, classObj).save()

            if classObj.reactivate_all:
                # Objective: Mark all such objects as reactive again.
                # Find all objects with the name of class (returns the classObj defined above as well)
                classObj.is_cancelled = False
                super(Class, classObj).save()
                list_obj = Class.objects.all().filter(name=classObj.name)
                # print('Count of objects: ', len(list_obj))
                # Change all such objects date value based on new self saved value for that object

                for obj in list_obj:
                    # Change only for those whose date is after the self date
                    # print("obj id", obj.id)
                    # print("obj is cancelled", obj.is_cancelled)
                    # print("classObj is cancelled", classObj.is_cancelled)
                    if obj.start_time > classObj.start_time:
                        # print("case cancelled__")
                        obj.is_cancelled = False
                        classObj.reactivate_all = False
                        # print(classObj.cancel_all)
                        super(Class, obj).save()
                # Reset the classObj cancel_all property to False again
                super(Class, classObj).save()

    """
    USE PRE-SAVE AND POST-SAVE signals for checking what old name was and make changes for that old name with values of 
    new name objects.
        def bulk_edit_if_any(self, *args, **kwargs):
        # Function to bulk edit weekly classes for the given studio (if multiple classes are possible between the
        # start date and end recursion date).

        # Save latest object
        super(Class, self).save(*args, **kwargs)
        last_class_object = Class.objects.last()

        if last_class_object.edit_all:
    """


class UserClasses(models.Model):
    # User here must be Praket's user model
    user = models.ForeignKey(to=user, related_name='user_info', on_delete=models.CASCADE)
    # Class enrolled references the class object
    # class_enrolled = models.ForeignKey(to=Class, on_delete=models.CASCADE, related_name='class_enrolled')
    # Consider renaming enroll_to_class to class
    # (and use id and what not to find if its the required class consider we save row by row anyways)

    # See if you can remove class_enrolled field if not required (after making change to disply class schedule for studio)
    class_info = models.ForeignKey(to=Class, on_delete=models.CASCADE, blank=True, null=True, default=None)
    # modify_future_classes reflects behavior for both enroll in future classes for ENROLL case and
    # drop future classes for DROP case
    modify_future_classes = models.BooleanField(default=False)

    def __str__(self):
        # print(self.user.id)
        return str(self.user.username)
