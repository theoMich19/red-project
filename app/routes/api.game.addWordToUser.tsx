import { ActionFunctionArgs } from "@remix-run/node";
import { getSession } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
    const session = await getSession(request)
    const token = await session.get("token")
    console.log("🚀 ~ action ~ token:", token)


    const formData = await request.formData()
    const response = await fetch(`${process.env.REST_URL_API}/users/add-word `, {
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

