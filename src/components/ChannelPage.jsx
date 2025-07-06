import ProfileCard from "../components/Profile/ProfileCard.jsx";
import {Outlet , useParams} from 'react-router-dom'
import axiosInstance from "../services/axiosInstance.js";
import {useQuery} from "@tanstack/react-query"

function ChannelPage () {
    const {userName} = useParams()
    console.log(userName)

    const {data : owner} = useQuery({
        queryKey : ["owner" , userName],
        queryFn : async () => {
            const res = await axiosInstance.get(`/users/c/${userName}`)
            return res.data?.data;
        },
        staleTime : Infinity,
        enabled : !!userName
    })

    return (
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            {owner && (
                <ProfileCard
                    coverPhoto = {owner.coverImage}
                    avatar = {owner.avatar}
                    channelName = {owner.fullName}
                    channelHandle = {owner.userName}
                    isSubscribed = {owner.isSubscribed}
                    channelId = {owner._id}
                    subscribers = {owner.subscribersCount}
                    subscribed = {owner.subscribedToCount}
                />
            )}
            <Outlet/>
        </section>
    )
}

export default ChannelPage