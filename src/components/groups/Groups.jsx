import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {
    ActionIcon,
    Avatar,
    Button,
    Card, Divider,
    Group, Modal, Paper,
    ScrollArea,
    SegmentedControl,
    Stack,
    Tabs, Text,
    Textarea, TextInput,
    TypographyStylesProvider
} from "@mantine/core";
import {useForm} from "react-hook-form";
import {useAuth} from "../AuthContext";
import {TbMinus, TbPlus} from "react-icons/tb";

const getAssociations = ()=>{
    return  axios.get('http://localhost:8080/associations').then(({data})=>data)
}

const getPosts = ()=>{
    return  axios.get('http://localhost:8080/posts').then(({data})=>data)
}

const addComment = (data)=>{
    return  axios.post('http://localhost:8080/addpost',data).then(({data})=>data)

}

const joinGroup = (data)=> axios.post(`http://localhost:8080/user/joinGroup`,data).then(({data})=>data)
const leaveGroup = (data)=> axios.post(`http://localhost:8080/user/leaveGroup`,data).then(({data})=>data)

const Groups = () => {
    const { user } = useAuth()
    const userId =user ? user.id : null
    console.log(userId)
    const [activeGroup, setActiveGroup] = useState();
    const[openedNewGroupModal, setOpenedNewGroupModal] = useState(false)

    const {data, refetch:refetchGroup} = useQuery({
        queryKey:['associations'],
        queryFn:getAssociations
    })
    const {data:posts, refetch:refetchPosts} = useQuery({
        queryKey:['posts'],
        queryFn:getPosts
    })

    const joinGroupMutation = useMutation(joinGroup,{
        onSuccess:()=>{
            refetchGroup()
        }
    })

    const leaveGroupMutation = useMutation(leaveGroup,{
        onSuccess:()=>{
            refetchGroup()
        }
    })





    const { handleSubmit,setValue, register} = useForm()


    const addCommentMutation = useMutation(addComment,{
        onSuccess:()=>{
            setValue('content','')
            refetchPosts()
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        addCommentMutation.mutate({
            content:data.content,
            associationId:activeGroup,
        })
    }


    useEffect(()=>{
        if(data && data.length>0) setActiveGroup(data[0].id.toString())
    },[data])

    if(!data || !activeGroup || !posts) return <p>Loading...</p>



   return (
      <>
          <Tabs variant={'pills'} styles={()=>({
              tab:{
                  fontSize:'16px',
                  display: 'flex',
                  borderRadius: 5,
                  paddingContentVertical: 9,
                  flexGap: 10,
                  fontWeight:500,


              },
              tabsList: {
                  width: 'fit-content',
                  marginRight: 20,
                  padding: 10,
                  flexDirection: 'column',

                  backgroundColor: '#fff',
                  height: 'fit-content',
                  borderRadius: 10,
                  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
              },

          })} onTabChange={setActiveGroup} placement={'right'} orientation={'vertical'} defaultValue={data[0].id.toString()}>
              <Tabs.List>
                  <Button variant={"outline"} mb={'xs'} size={'lg'} onClick={()=>{setOpenedNewGroupModal(true)}}>Dodaj nową</Button>
                  {data.map(item=>(
                    <Group position={'apart'}>
                        <Tabs.Tab  key={item.id} value={item.id.toString()}>

                            {item.name}

                        </Tabs.Tab>
                        {item.users.find(user=>user.id===userId) ?   <ActionIcon variant={'outline'} color={'red'} size={'xl'} onClick={()=>{
                            leaveGroupMutation.mutate({userId,groupId:item.id})
                        }}><TbMinus /></ActionIcon>:<ActionIcon size={'xl'} variant={'outline'} color={'green'} onClick={()=>{
                            joinGroupMutation.mutate({userId,groupId:item.id})
                        }}><TbPlus /></ActionIcon>}
                    </Group>

              ))}

              </Tabs.List>
              <Tabs.Panel value={activeGroup} mr={'xs'}>
                  <ScrollArea h={800}>
                      <Stack>
                          <FilteredGroups allGroups={posts} activeGroup={activeGroup}/>
                      </Stack>
                  </ScrollArea>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <Stack mt={'lg'}>
                          <Textarea
                              {...register("content")}
                              minRows={5}
                              placeholder="Dodaj komentarz"
                              withAsterisk
                          />
                          <Button type={'submit'} w={'fit-content'} size={"lg"}  color="blue" >Dodaj</Button>
                      </Stack>
                  </form>
              </Tabs.Panel>
          </Tabs>
          <ModalForm opened={openedNewGroupModal} setOpened={setOpenedNewGroupModal} refetch={refetchGroup}/>
      </>
   )
};

export default Groups;


const createGroup = (data)=>{
    return  axios.post('http://localhost:8080/association',data).then(({data})=>data)
}

const ModalForm = ({opened, setOpened, refetch}) => {
    const addGroupMutation = useMutation(createGroup,{
        onSuccess:()=>{
            refetch && refetch()
            setOpened(false)
        }
    })

    const { handleSubmit, register} = useForm()

    const onSubmit = (data) => {
        addGroupMutation.mutate({
            name:data.name,
        })
    }
    return <Modal centered title={'Dodawanie grupy'} zIndex={1000} opened={opened} onClose={()=>{setOpened(false)}} padding={'xl'} size={'md'} >
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput  placeholder={'Nazwa grupy'} {...register('name')} />
            <Divider my={'lg'}/>
            <Group noWrap spacing={'xs'}>
                <Button fullWidth variant={'outline'} onClick={()=>{setOpened(false)}}>Anuluj</Button>
                <Button type={'submit'} fullWidth color={'blue'}>Dodaj</Button>
            </Group>
        </form>
    </Modal>
}

const FilteredGroups = ({allGroups, activeGroup}) => {
    const filteredPosts = allGroups.filter(post => post.association.associationId.toString() === activeGroup.toString());

    filteredPosts.sort((a,b)=>new Date(b.data).getTime()-new Date(a.data).getTime())

    if(filteredPosts.length===0) return <Group position={'center'} ><Text color={'gray.7'}>Brak postów</Text></Group>
    return filteredPosts.map(post => (<Card radius={'md'}>
        <Group>
            <Avatar
                alt={`${post.user.firstname} ${post.user.lastname}`}
                radius="xl"
                color={post.user.color} // Użyj koloru z danych użytkownika
            >
                {post.user.firstname[0].toUpperCase()}
                {post.user.lastname[0].toUpperCase()}
            </Avatar>
            <div>
                <Text size="sm">{post.user.nickname}</Text>
                <Text size="xs" color="dimmed">
                    {new Date(post.data).toLocaleString()}
                </Text>
            </div>
        </Group>
        <Text pl={54} pt="sm" size="sm">
            {post.content}
        </Text>
    </Card>))
}