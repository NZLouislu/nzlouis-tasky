import { Box, Text, useColorModeValue, Container } from '@chakra-ui/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const bgColor = useColorModeValue('whiteAlpha.900', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const boxShadow = useColorModeValue('sm', 'dark-lg');

    return (
        <Box bg={bgColor} p={4} color={textColor} textAlign="center" mt={8} boxShadow={boxShadow}>
            <Container maxW="container.xl">
                <Text fontSize={{ base: "sm", md: "md" }}>&copy; {currentYear} NZLouis. All rights reserved.</Text>
            </Container>
        </Box>
    );
};

export default Footer;