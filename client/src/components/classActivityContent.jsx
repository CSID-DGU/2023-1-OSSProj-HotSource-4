import {Box, Button, Container, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import GridItem from "./groupProjectList";
import GroupProjectList from "./groupProjectList";

const ClassActivityContent = (props) => {
    const handleTabClick = (n) => {
        props.setTab(n);
    }

     return (
        <Box
            flex={1}
            h="850px"
        >
            <Box
                h={100}
                p={10}

            >
                <HStack justify="space-between">
                    <Heading as="h2" fontSize={30}>학습 활동</Heading>
                    <Button>과목 정보</Button>
                </HStack>
            </Box>
            <Box
                h={550}
                p={5}
            >
                <Tabs variant='enclosed' colorScheme='gray' index={props.tab} onChange={handleTabClick}>
                    <TabList >
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.700' }} fontWeight="600">출석</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.700' }} fontWeight="600">과제</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.700' }}  fontWeight="600">토론</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.700' }}  fontWeight="600">시험</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.700' }}  fontWeight="600">설문</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.700' }}  fontWeight="600">팀활동</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                            <Container alignItems="center" maxW="100%">
                                <GroupProjectList title={props.title} user={props.user} />
                            </Container>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default ClassActivityContent;