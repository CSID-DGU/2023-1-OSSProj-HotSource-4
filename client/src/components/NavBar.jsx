import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Text,
    Button,
    Divider,
    StackDivider
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { BsFillHouseFill, BsPersonFill, BsChatSquare } from "react-icons/bs";

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
            p={0}
            maxW="81%"
            wrap="wrap"
            align="center"
            justify="space-between"
            >
                <Stack
                    divider={<StackDivider borderColor='gray.600' />}
                    direction={{ base: 'row', md: 'row'}}
                    display={{ base: 'flex', md: 'flex', sm: 'none'}}
                    width={{ base: 'full', md: 'auto'}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 0, md: 0}}
                >
                    <LinkItem m={0} p={0}/>
                    <LinkItem href="/" path={path}>
                        <BsFillHouseFill size="25" />
                        <Button variant="link" colorScheme='white' size='xs'>
                            홈으로
                        </Button>
                    </LinkItem>
                    <LinkItem href="/my" path={path}>
                        <BsPersonFill size="25" />
                        <Button variant="link" colorScheme='white' size='xs'>
                            마이페이지
                        </Button>
                    </LinkItem>
                    <LinkItem m={0} p={0}/>

                </Stack>


                <Stack
                    align="right"
                    divider={<StackDivider borderColor='gray.600' />}
                    direction={{ base: 'row-reverse', md: 'row-reverse'}}
                    display={{ base: 'flex', md: 'flex'}}
                    width={{ base: 'full', md: 'auto'}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 0, md: 0}}
                >
                    <Box />
                    <Box ml={10}>
                        <Text color="white" fontWeight="bold" fontSize={14} whiteSpace="inherit" align="left">
                            민헌준
                        </Text>
                        <Button variant="solid" colorScheme='gray' size='xs' mr={1}>
                            대표 권한 설정
                        </Button>
                        <Button variant="solid" colorScheme="gray" size='xs' mr={1}>
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
                    <Box />
                </Stack>
            </Container>
        </Box>
    )
}

export default NavBar;