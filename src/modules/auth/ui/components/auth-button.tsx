"use client";
import { Button } from "@/components/ui/button";
import { pageUrls } from "@/lib/enums/page-urls";
import {UserButton, SignInButton, SignedIn, SignedOut, useAuth} from "@clerk/nextjs";
import { ClapperboardIcon, UserCircleIcon, UserIcon } from "lucide-react";
import {useEffect} from "react";

const AuthButton = () => {
    const { getToken } = useAuth();
    useEffect(() => {
        // Chúng ta cần một hàm async bên trong useEffect để có thể dùng await
        const logTokenForTesting = async () => {
            // Lấy token từ session hiện tại
            const token = await getToken();
            // In ra console với một nhãn rõ ràng để bạn dễ tìm
            console.log("CLERK_TOKEN_FOR_TESTING:", token);
        };

        // Gọi hàm để thực thi
        logTokenForTesting();

    }, [getToken]);
    return (
        <>
            <SignedIn>
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Link
                            href={`/users/current`}
                            label="My profile"
                            labelIcon={<UserIcon className="size-4" />}
                        />
                        <UserButton.Link
                            href={pageUrls.STUDIO}
                            label="Studio"
                            labelIcon={<ClapperboardIcon className="size-4" />}
                        />
                        <UserButton.Action label="manageAccount" />
                    </UserButton.MenuItems>
                </UserButton>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button
                        variant="outline"
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
                    >
                        <UserCircleIcon />
                        Sign in
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    )
}

export default AuthButton;