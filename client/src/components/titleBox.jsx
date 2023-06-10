import {Box, Button, Container, Divider, HStack, Spinner, StackDivider, Text} from "@chakra-ui/react";
import {EmailIcon} from "@chakra-ui/icons";
import {gql, useQuery} from "@apollo/client";

const QUERY_SUBJECT = gql`
query Subject($subjectId: ID!) {
  subject(subjectId: $subjectId) {
    name
    classification
    credit
    capacity
    users {
      _id
      groups {
        _id
      }
    }
  }
}
`

const TitleBox = (props) => {
    const basicBoxStyles = {
        background:
            'url(/pxfuel.jpg) center/cover no-repeat'
    }

    function get_id(title) {
        if(title) return title;
        else {
            if(props.data.user.isAdmin) {
                props.setTitle("6471ea1d8c0d64b3c26745d4");
                return "6471ea1d8c0d64b3c26745d4"
            }
            else props.setTitle(props.data.user.subjects[0]._id);
            return props.data.user.subjects[0]._id;
        }

    }

    const _id = get_id(props.title);
    const values = { subjectId : _id};
    const { data, loading, error } = useQuery(QUERY_SUBJECT, {
        variables: values,
        onError(graphglError){
            console.log(graphglError);
        }
    });

    console.log(data);

    if(loading) return (
        <Container
            display={ props.hidden ? "none" : "flex" }
            p={0}
            maxW="80%"
            wrap="wrap"
            justify="center"
            align="center"
        >
            <Box
                sx={basicBoxStyles}
                w="inherit"
                h="270px"
                mx="auto"
                objectFit='cover'
            >
                <Spinner size='xl'/>
            </Box>
        </Container>)

    if (!loading) return (
        <>
        <Container
            display={props.hidden ? "flex" : "none" }
            maxW="80%"
            h="65px"
        />
        <Container
            display={ props.hidden ? "none" : "flex" }
            p={0}
            maxW="80%"
            wrap="wrap"
            justify="center"
            align="center"
        >
            <Box
                sx={basicBoxStyles}
                w="inherit"
                h="270px"
                mx="auto"
                objectFit='cover'
            >
                <Text //과목명 Text
                    mt="90px"
                    fontSize={45}
                    fontWeight="extrabold"
                    color="white"
                >
                    {data.subject.name}
                </Text>
                <Container //과목 상세 정보 Box
                    bg="whiteAlpha.700"
                    maxW="80%"
                    p="10px"
                    flexWrap="wrap"
                    borderRadius={10}
                >
                    <HStack
                        justifyContent="space-between"

                    >
                        <Box
                            bg="blackAlpha.700"
                            w="250px"
                            h="60px"
                            borderRadius={5}
                            align="center"
                        >
                            <HStack
                                divider={<StackDivider />}
                                color="white"
                                justify="space-evenly"
                                p={1}
                                fontSize={12}
                            >
                                <Text>
                                    이수구분
                                </Text>
                                <Text>
                                    학점
                                </Text>
                                <Text>
                                    교수정보
                                </Text>
                            </HStack>
                            <Divider />
                            <HStack
                                divider={<StackDivider />}
                                color="white"
                                justify="space-evenly"
                                p={1}
                                fontSize={12}
                            >
                                <Text>
                                    {data.subject.classification}
                                </Text>
                                <Text>
                                    {data.subject.credit} 점
                                </Text>
                                <Button size="xs" align="center" bgColor="blackAlpha.700">
                                    조회하기
                                </Button>
                            </HStack>
                        </Box>
                        <Box
                            bg="whiteAlpha.700"
                            w="350px"
                            h="60px"
                            borderRadius={5}
                        >
                            <HStack
                                divider={<StackDivider borderColor="blackAlpha.700"/>}
                                color="blackAlpha.700"
                                justify="space-evenly"
                                p={1}
                                fontSize={12}
                            >
                                <Text>
                                    수강정원
                                </Text>
                                <Text>
                                    수강생 조회
                                </Text>
                            </HStack>
                            <Divider borderColor="blackAlpha.700"/>
                            <HStack
                                divider={<StackDivider borderColor="blackAlpha.700"/>}
                                color="blackAlpha.700"
                                justify="space-evenly"
                                p={1}
                                fontSize={12}
                            >
                                <Text ml={7}>
                                    {data.subject.capacity} 명
                                </Text>
                                <Button size="xs" align="center" bgColor="blackAlpha.700" color="whiteAlpha.900">
                                    조회하기
                                </Button>
                            </HStack>
                        </Box>
                    </HStack>
                </Container>
            </Box>

        </Container>
        </>
    )
};

export default TitleBox;