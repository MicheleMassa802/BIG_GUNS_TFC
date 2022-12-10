import { useContext } from "react";
import {IndStudiosContext} from "../../../Contexts/Ind_studio";

const ImagesTable = ({perPage, params}) => {
    const { ind_studio } = useContext(IndStudiosContext);
    return <table>
            <thread>
                <tr>
                    <th> Image </th>
                </tr>
            </thread>
    
            <tbody>
                {ind_studio.images.map((image, index)=> (
                    <tr key={ind_studio.images.id}>
                        <td> {(params.page - 1) * perPage + index + 1} </td>
                        <img src={ind_studio.images.image}></img>
                    </tr>
                ))}
            </tbody>
        </table>

}

export default ImagesTable