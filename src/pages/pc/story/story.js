import React, {useState, useEffect} from 'react';
import {
    Col,
    Row,
    Card,
    Avatar,
    Tag,
    Space,
    Typography,
    TextArea,
    Button,
    Toast
} from '@douyinfe/semi-ui';

import {
    IconCamera,
    IconMapPin,
    IconMail,
    IconMale,
    IconFemale
} from '@douyinfe/semi-icons';
import axios from 'axios';
import MyFooter from "../../footer/footer";
import {GetPrefix, GetName, SetUri} from "../../../utils/utils";

function PcStory() {
    const {Title, Text} = Typography
    const style = {
        backgroundColor: 'var(--semi-color-overlay-bg)',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const pStyle = {
        wordBreak: "break-all",
        wordWrap: "break-word",
    }

    const bodyHeight =  document.documentElement.clientHeight
    const hover = (
        <div style={style}>
            <IconCamera/>
        </div>
    );

    // hock数据获取
    const prefix = GetPrefix()
    const name = GetName()
    const [userInfo, setUserInfo] = useState({});
    const [userTitle, setUserTitle] = useState([]);
    const [msgBtnState, setMsgBtnState] = useState(false);
    useEffect(() => {
        let storyUri = "/stories"
        storyUri = SetUri(storyUri, name)
        axios.get(prefix + storyUri).then((response) => {
            setUserInfo(response.data);
            setUserTitle(response.data.title)
        });
    }, [prefix, name]);

    function sendMsg() {
        const msg = document.getElementById( 'msg' );
        const content = msg.innerHTML;
        msg.setAttribute("value","")
        setMsgBtnState(true);
        axios.post(prefix+"/stories/email",content).then((response)=>{
            Toast.success(response.data.message)
        }).catch(function (error) {
            Toast.error(error.message)
        })
        setMsgBtnState(false);
    }



    return (
        <div className="grid" style={{
            width:"100%",
            height:{bodyHeight},
            overflowY: 'hidden',
            overflowX: 'hidden',
        }}>
            <Row>
                <Col span={6}>
                    <div className="col-content" style={{
                        paddingLeft: document.documentElement.clientWidth / 25,
                        paddingRight: document.documentElement.clientWidth / 50,
                        paddingTop:  {bodyHeight}.bodyHeight / 100 * 15,

                    }}>
                        <Card
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                paddingTop:  {bodyHeight}.bodyHeight / 100 * 5,
                                height: {bodyHeight}.bodyHeight / 100 * 60,
                                overflowY: 'auto',
                            }}
                        >
                            <Avatar hoverMask={hover} color="red">
                                {userInfo.avatar}
                            </Avatar>
                            <br/>
                            <Title heading={4} style={{margin: '8px 0'}}>{userInfo.name}</Title>
                            @{userInfo.nick_name}
                            <br/>
                            <br/>
                            <div style={{
                                textAlign: 'left',
                            }}>
                                <p style={pStyle}>
                                    <IconMapPin/>
                                    <Text> {userInfo.position} </Text>
                                </p>
                                <br/>
                                <p style={pStyle}>
                                    <IconMail/>
                                    <Text> {userInfo.email}</Text>
                                </p>
                                <br/>
                                <p style={pStyle}>
                                    {userInfo.gender === "男" ? <IconMale/> : <IconFemale/>}
                                    <Text> {userInfo.hobby} </Text>
                                </p>
                                <br/>
                                <Space>
                                    <div style={pStyle}>
                                        {
                                            userTitle.map((titles) =>
                                                <Tag size='large' color='blue' style={{margin:4}} key={titles}> {titles} </Tag>
                                            )

                                        }
                                    </div>
                                </Space>
                            </div>
                            <br/>
                        </Card>
                    </div>
                </Col>
                <Col span={18} style={{
                    height:{bodyHeight}.bodyHeight-60,
                    overflowY: 'auto',
                    overflowX: 'auto',
                }}>
                    <div className="col-content" style={{
                        paddingLeft: document.documentElement.clientWidth / 50,
                        paddingRight: document.documentElement.clientWidth / 25,
                        paddingTop: {bodyHeight}.bodyHeight / 100 * 5,
                    }}>
                        <Card
                            title={"A Little Story"}
                            headerLine={false}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Card style={{
                                width: '100%',
                                height: document.documentElement.clientHeight / 3,
                                overflowY: "auto",
                            }}>
                                {userInfo.story}
                            </Card>
                        </Card>
                        <br/>
                        <Card
                            title={"Send To Me A Msg"}
                            headerLine={false}
                            style={{
                                width: '100%',
                            }}
                        >
                            <div>
                                <TextArea id={"msg"}
                                          placeholder={"给我说点什么"}
                                          showClear={true}
                                          maxCount={2000}/>
                            </div>
                            <Button theme='solid'
                                    type='primary'
                                    style={{marginTop: 8}}
                                    disabled={msgBtnState}
                                    onClick={sendMsg}>SendMsg</Button>
                        </Card>
                    </div>
                    <br/>
                    <MyFooter/>
                </Col>
            </Row>
        </div>
    )
}

export default PcStory