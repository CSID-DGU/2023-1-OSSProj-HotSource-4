import {Button, Menu, MenuButton, MenuItem, MenuList, Select, Spinner} from "@chakra-ui/react";
import {gql, useQuery} from "@apollo/client";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {useEffect} from "react";

const QUERY_SUBJECT = gql`
query Subject($id: ID!) {
  subject(_id: $id) {
    _id
    name
    users {
      _id
      groups {
        _id
      }
    }
  }
}
`

const MenuLists = (props) => {


    const [ query, { data, loading, error } ] = useQuery(QUERY_SUBJECT, {
        onError(graphglError){
            console.log(graphglError);
        }
    });



    if (loading) return (<Spinner />)
    if (!loading) return (
        <Select maxH="25px"
                w="250px"
                border="solid"
                borderColor="blackAlpha.300"
                borderWidth="3px"
                borderRadius="5px"
                bg='whiteAlpha.800'
                color='blackAlpha.800'
                size="sm"
                rightIcon={<ChevronDownIcon />}
                fontSize={12}
                >
            {props.data.user.subjects.map((item) =>
                (
                <option onClick={props.setTitle(item._id)} value={item._id} >{item.name}</option>
            )  )}

                <option onClick={props.setTitle(data.subject._id)} value={data.subject._id}> {data.subject.name}  </option>
        </Select >

    )
};

export default MenuLists;