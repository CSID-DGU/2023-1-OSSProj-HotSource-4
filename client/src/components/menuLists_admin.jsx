import {Button, Menu, MenuButton, MenuItem, MenuList, Select} from "@chakra-ui/react";
import {gql, useQuery} from "@apollo/client";
import {ChevronDownIcon} from "@chakra-ui/icons";

const QUERY_SUBJECT = gql`
query Subjects {
  subjects {
    _id
    capacity
    classification
    credit
    name
    users {
      _id
    }
  }
}
`

const MenuLists_admin = (props) => {

    const { data, loading, error } = useQuery(QUERY_SUBJECT, {
        onError(graphglError){
            console.log(graphglError);
        }
    });

    function changeSelection() {
        const selectedItem = document.getElementById("select");
        console.log(selectedItem);
        const itemName = selectedItem[selectedItem.selectedIndex].value;
        console.log(itemName);

        props.setTitle(itemName);
    }


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
                placeholder="과목 선택"
                id = "select"
                onChange={changeSelection}
        >
                {data.subjects.map((item, index)=>(
                    <option id={index} value={item._id}> {item.name}  </option>  ) )}
        </Select>
    )
};

export default MenuLists_admin;