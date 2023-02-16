import { Text, Card, Flex } from "@mantine/core";
import { useStyles } from "./styles";
import { Users } from "tabler-icons-react";
import { Progress } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

const Cards = ({ data,setUrl ,url }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  // console.log(url)
  
  const handleClick=()=>{
    if(data.link){
      // alert("link")
      navigate(data.link)
    }
    else if(data.url){
      // alert("url")
      setUrl(data.url)
    }
  }
  return (
    <>
      <Card
        className={classes.card}
        shadow="lg"
        h={140}
        w={270}
        component="a"
        radius={26}
        withBorder
        onClick={handleClick}
      >
        <Flex align={"baseline"} justify="space-between" mt="none">
          <Text weight={600} size="lg" mt="none" color="dimmed">
            {data.title}
          </Text>
          <Users size={22} strokeWidth={3} color={"black"} />
        </Flex>

        <Text mt="0px" fw="bolder" size={30}>
          {data.value}
        </Text>
        {/* <Text size="xs" m="none">50%</Text> */}
        <Progress mt="sm" value={78} color={data.color} size={6} />
        <Text fw="bolder" size={10}>
          Response Rate 50%
        </Text>
      </Card>
     
    </>
  );
};
export default Cards;
