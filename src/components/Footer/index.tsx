import { Flex, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex
      as="footer"
      maxH="60px"
      bg="#f5f5f5"
      p="0.8rem"
      justifyContent="center"
      mt="2rem"
    >
      <Text textAlign="center">
        Desenvolvido por <Text as="strong">Moisés Menezes</Text>
      </Text>
    </Flex>
  );
}

export default Footer;
