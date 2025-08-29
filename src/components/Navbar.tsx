import { Box, Flex, Text, Spacer, HStack, Image, useColorModeValue, Container, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('whiteAlpha.900', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const boxShadow = useColorModeValue('sm', 'dark-lg');

    return (
        <React.Fragment>
            <Flex
                bg={bgColor}
                p={4}
                color={textColor}
                alignItems="center"
                position="fixed"
                top="0"
                width="100%"
                zIndex="100"
                boxShadow={boxShadow}
            >
                <Container maxW="container.xl" display="flex" alignItems="center" p={0}>
                    <HStack>
                        <Image src={logo} boxSize="50px" />
                        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">NZLouis</Text>
                    </HStack>
                    <Spacer />

                    <HStack spacing={{ base: 2, md: 4 }} display={{ base: "none", md: "flex" }}>
                        <Text fontSize={{ base: "sm", md: "md" }}>Projects</Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>Modules</Text>
                        <Text>Tasks</Text>
                        <ColorModeSwitch />
                    </HStack>

                    <IconButton
                        aria-label="Open Menu"
                        icon={<HamburgerIcon />}
                        size="md"
                        onClick={onOpen}
                        display={{ base: "flex", md: "none" }}
                        variant="ghost"
                        color={textColor}
                    />
                </Container>
            </Flex>

            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={bgColor} color={textColor}>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems="flex-start" spacing={4}>
                            <Text onClick={onClose}>Projects</Text>
                            <Text onClick={onClose}>Modules</Text>
                            <Text onClick={onClose}>Tasks</Text>
                            <ColorModeSwitch />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box height="82px" />
        </React.Fragment>
    );
};

export default Navbar;