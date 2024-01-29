import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Card, ScrollArea, SegmentedControl, Stack, Tabs} from "@mantine/core";

const getAssociations = ()=>{
    return  axios.get('http://localhost:8080/associations').then(({data})=>data)
}

const getPosts = ()=>{
    return  axios.get('http://localhost:8080/posts').then(({data})=>data)

}

const Groups = () => {
    const [activeGroup, setActiveGroup] = useState();

    const {data} = useQuery({
        queryKey:['associations'],
        queryFn:getAssociations
    })
    const {data:posts} = useQuery({
        queryKey:['posts'],
        queryFn:getPosts
    })


    console.log(data)

    useEffect(()=>{
        if(data && data.length>0) setActiveGroup(data[0].id.toString())
    },[data])

    if(!data || !activeGroup || !posts) return <p>Loading...</p>


   return (
       <Tabs variant={'pills'} styles={()=>({
           tab:{
               fontSize:'24px',
               display: 'flex',
               borderRadius: 5,
               padding: 12,
               flexGap: 20,

           },
           tabsList: {
               width: 'fit-content',
               marginRight: 20,
               padding: 10,
               flexDirection: 'column',
               gap:10,
               backgroundColor: '#fff',
               height: 'fit-content',
               borderRadius: 10,
               boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
           },

       })} onTabChange={setActiveGroup} placement={'right'} orientation={'vertical'} defaultValue={data[0].id.toString()}>
           <Tabs.List  >
                {data.map(item=>(
                     <Tabs.Tab  key={item.id} value={item.id.toString()}>{item.name}</Tabs.Tab>
                ))}
           </Tabs.List>
           <Tabs.Panel value={activeGroup} mr={'xs'}>
               <ScrollArea h={800}>
                   <Stack>
                       <FilteredGroups allGroups={posts} activeGroup={activeGroup}/>

                   </Stack>

               </ScrollArea>
           </Tabs.Panel>
       </Tabs>
   )
};

export default Groups;

const FilteredGroups = ({allGroups, activeGroup}) => {
    const filteredPosts = allGroups.filter(post => post.association.associationId.toString() === activeGroup.toString());
    return  filteredPosts.map(post => (
            <Card radius={'md'} shadow={'md'} key={post.id}>
                <p>Autor: {post.user.nickname}</p>
                <h3>{post.content}</h3>
                <p>Data: {new Date(post.data).toLocaleString()}</p>
            </Card>
        ))
}