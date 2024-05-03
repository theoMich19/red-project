import { ActionFunctionArgs } from "@remix-run/node";
import { getSession } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
    const session = getSession(request)
    const token = (await session).get("token")


    const formData = await request.formData()
    const response = await fetch(`${process.env.REST_URL_API}/user/add-word`, {
        method: "post",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    const result = await response.json()
    return result
}