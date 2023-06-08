import {Button, Menu, MenuButton, MenuItem, MenuList, Select, Spinner} from "@chakra-ui/react";
import {gql, useQuery} from "@apollo/client";
import {ChevronDownIcon} from "@chakra-ui/icons";

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

    const _id = props.data.user.subjects[0]._id;
    const values = { id : _id};
    const { data, loading, error } = useQuery(QUERY_SUBJECT, {
        variables: values,
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
                <option onClick={props.setTitle(data.subject._id)} value={data.subject._id}> {data.subject.name}  </option>
        </Select >

    )
};

export default MenuLists;