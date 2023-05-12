import {
    Box,
    Container,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ClassAccordionTab from "../components/ClassAccordionTab";
import ClassLearningContent from "../components/ClassLearningContent";
import ClassTitleBox from "../components/ClassTitleBox";
import ClassActivityContent from "../components/ClassActivityContent";


const Class = () => {

    const [index, setIndex ] = useState(0);
    const [tab, setTab ] = useState(0);
    const setContents = (n, m) => {
        setIndex(n);
        setTab(m);
    }

    return (<>
        <NavBar /> {/* 네비게이션 컴포넌트 */}
        <ClassTitleBox />  {/*메인 과목명 Container*/}

        <Container
            maxW="80%"
            p={0}
        >
            <Flex>
                <ClassAccordionTab setContets={setContents}/>

                {(index == 0) ? <ClassLearningContent tab={tab} setTab={setTab}/> : <Box />}
                {(index == 2) ? <ClassActivityContent tab={tab} setTab={setTab}/> : <Box />}


            </Flex>
            <Footer />
        </Container>

    </>)
}

export default Class;