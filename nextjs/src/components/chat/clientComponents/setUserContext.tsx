"use client";

import { useUserContext } from "../../../lib/contexts/userContext";
import { useGetSelfDetails } from "../../../utils/hooks/queries";

export default function SetUserContextComponent() {
    const { user, setUser } = useUserContext();
    const { data } = useGetSelfDetails();
    if (!user._id) {
        if (data?.data) {
            const { name, username, profilePicture, _id } = data?.data;
            setUser({ name, username, profilePicture, _id });
        }
    }
    return <></>;
}
