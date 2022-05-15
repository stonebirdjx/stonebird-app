import React, {useState, useEffect} from 'react';
import {
    Button,
    Layout,
    Nav,
    Avatar,
    Tooltip,
    Toast
} from '@douyinfe/semi-ui';
import {
    IconAt,
    IconUserCardVideo,
    IconMoon,
    IconSun,
    IconLanguage,
    IconCode,
    IconQrCode,
    IconSend
} from '@douyinfe/semi-icons';
import { Outlet, useLocation, useNavigate} from 'react-router-dom'
import {GetName, GetPrefix} from "../../../utils/utils";
import axios from "axios";

function PcPrimary() {
    const body = document.body;
    body.style.backgroundColor='var(--semi-color-bg-0)';
    const { pathname,search } = useLocation()
    const {Header, Content} = Layout;
    // 确定退出
    const navigate = useNavigate()

    const NavClick = (msg) => {
        navigate(msg.itemKey+search)
    }
    const prefix = GetPrefix()
    const name = GetName()
    const [dark, setDark] = useState(false);
    const [contentHeight, setContentHeight] = useState();
    const uri = "/themes";
    useEffect(() => {
        setContentHeight(document.documentElement.clientHeight-document.getElementById('header').offsetHeight-100);
        axios.get(prefix+uri ).then((response) => {
            setDark(response.data.dark)
        });
    },[contentHeight,prefix,name]);
    dark? body.setAttribute('theme-mode', 'dark'):body.removeAttribute('theme-mode')
    let config = {
        headers : {
            'Content-Type':'application/json;charset=UTF-8'
        },
    };
    function changMode() {
        if (body.hasAttribute('theme-mode')){
            body.removeAttribute('theme-mode');
            setDark(false);
            saveMode(false)
        }else {
            body.setAttribute('theme-mode', 'dark');
            setDark(true);
            saveMode(true)
        }
    }

    function saveMode(msg) {
        axios.put(prefix + uri,JSON.stringify({"dark":msg}),config)
            .catch(function (error) {
                Toast.error("backend save theme err")
            });
    }


    function pcGoRoot(pc) {
        if (pc === "/pc"){
            window.location.href="/"
        }
    }

    return (
        <div style={{
            width:"100%",
            heigth:"100",
            overflowY: 'hidden',
            overflowX: 'hidden',
        }}>
            {pcGoRoot(pathname)}
            <Layout className="components-layout-demo">
                <Header id={"header"}>
                    <Nav
                        mode={'horizontal'}
                        defaultSelectedKeys={[pathname]}
                        onClick={NavClick}
                        items={[
                            {itemKey: '/pc/story', text: 'Story', icon: <IconAt/>},
                            {itemKey: '/pc/code', text: 'Code', icon: <IconCode/>},
                            {itemKey: '/pc/media', text: 'Media', icon: <IconUserCardVideo/>},
                            {itemKey: '/pc/ocr', text: 'Ocr', icon: <IconLanguage/>},
                            {itemKey: '/pc/qr', text: 'Qr', icon: <IconQrCode/>},
                            {itemKey: '/pc/resume', text: '简历', icon: <IconSend/>},
                        ]}
                        onSelect={key => console.log(key)}
                        header={{
                            logo: <Avatar size="default" color='light-blue' style={{margin: 4}}>STB</Avatar>,
                            text: '石鸟路遇'
                        }}
                        footer={
                            <div style={{position: 'relative'}}>

                                <Tooltip position="left" content={dark ? "更换到亮色模式" : "更换到暗色模式"}>
                                    <Button
                                        id={"mode"}
                                        theme='borderless'
                                        type='primary'
                                        onClick={changMode}
                                        icon={dark ? <IconMoon/> : <IconSun/>}
                                    />
                                </Tooltip>
                            </div>
                        }
                    />
                </Header>
                <Content style={{
                    height:document.documentElement.clientHeight - 60 + 'px',
                    overflowY:"auto",
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </div>
    )
}

export default PcPrimary