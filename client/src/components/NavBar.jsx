import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    Text,
    Button,
    StackDivider
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

const LinkItem = ({href, path, target, children, ...props}) => (
    <Link
        href={href}
        scroll={false}
        p={2}
        bg="#38393D"
        color="#D7D7D7"
        target={target}
        isExternal {...props}
    >
        {children}
    </Link>
)

const NavBar = (props) => {
    const { path } = props;

    return (
        <Box
        position = "fixed"
        as="nav"
        w ="100%"
        bg="#38393D"
        css={{backdropFilter: 'blur(10px'}}
        zIndex={2}
        {...props}
        >
            <Container
            display="flex"
            p={3}
            maxW="80%"
            wrap="wrap"
            //align="center"
            justify="space-between"
            >
                <Stack
                    divider={<StackDivider borderColor='gray.200' />}
                    direction={{ base: 'row', md: 'row'}}
                    display={{ base: 'flex', md: 'flex'}}
                    width={{ base: 'full', md: 'auto'}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0}}
                >
                    <LinkItem href="/home" path={path}>
                        <Text>
                        홈으로
                        </Text>
                    </LinkItem>
                    <LinkItem href="/my" path={path}>
                        마이페이지
                    </LinkItem>

                </Stack>


                <Stack
                    align="right"
                    divider={<StackDivider borderColor='gray.200' />}
                    direction={{ base: 'row-reverse', md: 'row-reverse'}}
                    display={{ base: 'flex', md: 'flex'}}
                    width={{ base: 'full', md: 'auto'}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0}}
                >
                    <Box ml={10}>
                        <Text color="white" fontWeight="bold" fontSize={14} whiteSpace="inherit">
                            민헌준
                        </Text>
                        <Button variant="solid" colorScheme='teal' size='xs' mr={1}>
                            대표 권한 설정
                        </Button>
                        <Button variant="solid" colorScheme="teal" size='xs' mr={1}>
                            로그아웃
                        </Button>
                    </Box>
                    <Box>
                       <Button variant="Link" leftIcon={<EmailIcon />} color="white" size='m' m={3}>
                           <Text letterSpacing={7}>
                               쪽지
                           </Text>
                       </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default NavBar;