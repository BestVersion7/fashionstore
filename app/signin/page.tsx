import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { SignInBtn } from "../components/account/SignInBtn";
import { SignOutBtn } from "../components/account/SignoutBtn";

export default async function SignInPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            {session && (
                <div>
                    <p>You are already signed in.</p>
                    <span className="bg-orange-300 px-3 py-1 hover:bg-orange-400">
                        <SignOutBtn />
                    </span>
                </div>
            )}

            {!session && (
                <div>
                    <h2 className="py-2">
                        Please create an account below or sign in:
                    </h2>
                    <SignInBtn />
                    <p>
                        By continuing, you agree to our{" "}
                        <span className="underline">privacy</span> notice and
                        terms of use.
                    </p>
                </div>
            )}
        </main>
    );
}
