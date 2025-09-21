import {HomeActions} from "@/modules/stream/components/home-actions";
import {Container, Flex, Link, Separator, Text} from "@radix-ui/themes";
import Image from "next/image";
import Background from "@/modules/stream/background";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-12 p-10 sm:p-24">
            <Background/>
            <Container size="1">
                <Flex direction="column" align="center" gap="5">
                    <Image
                        src="/WeTube.svg"
                        alt="LiveKit"
                        width="240"
                        height="120"
                        className="invert dark:invert-0 mt-8 mb-2"
                    />
                    <Text as="p">
                        Welcome to the WeTube livestream. You can join or start
                        your own stream. Hosted on{" "}
                        <Link href="https://livekit.io/cloud" target="_blank">
                            LiveKit Cloud
                        </Link>
                    </Text>
                    <HomeActions/>
                    <Separator orientation="horizontal" size="4" className="my-2"/>
                    <Text as="p" size="2">
                        Be shining and be confident with WeTube{" "}
                        .
                        {/* And also be sure to check out clone our{" "}
            <Link
              href="https://github.com/livekit-examples/swift-livestream"
              target="_blank"
            >
              iOS
            </Link>{" "}
            and <Link href="https://github.com/livekit-examples/android-livestream" target="_blank">Android</Link> clients, which are compatible with
            this web app! */}
                    </Text>
                </Flex>
            </Container>
        </main>
    );
}
