import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SignInBtn } from "./SignInBtn";

export default async function TestPage() {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <main>
            {session && (
                <div>
                    <p>Signed in as {session.user && session.user.name}</p>
                    <a href="/api/auth/signout">Sign out by link</a>
                </div>
            )}

            {!session && (
                <div>
                    <SignInBtn />
                </div>
            )}
        </main>
    );
}
