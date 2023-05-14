import { useAppSelector } from "../../app/store/configureStore";

export default function Profile(){

    const {user} = useAppSelector(state => state.acount);

    return(
        <>
        <div>My Profile</div>

        <div>{user?.email}</div>
        <div>{user?.userRole}</div>


        </>
    )
}