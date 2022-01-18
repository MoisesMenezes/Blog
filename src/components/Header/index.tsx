import { Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <Flex
      maxH="60px"
      bg="rgba(255, 255, 255, 0.01)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(2.4px)"
      width="100%"
      position="absolute"
      zIndex="10"
      p="0.8rem"
      css={{
        "-webkit-backdrop-filter": "blur(2.4px)",
      }}
    >
      <Link href="/">
        <a>
          <Flex align="center" gridGap="1rem">
            <Image
              src="/airplane.png"
              width={38}
              height={38}
              layout="fixed"
              alt="logo"
            />
            <Heading
              as="h3"
              fontFamily="Pacifico"
              color="white"
              fontSize="1.6rem"
            >
              Travel Blog
            </Heading>
          </Flex>
        </a>
      </Link>
    </Flex>
  );
}

export default Header;
