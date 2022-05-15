import {
    Divider,
    Typography
} from '@douyinfe/semi-ui';

import {
    IconSemiLogo,
    IconGithubLogo,
    IconLanguage
} from '@douyinfe/semi-icons';

import React from "react";
import beian from '../../static/img/beian.png'

class MyFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }


    render() {
        const {Title, Text} = Typography

        return (
            <div style={{
                textAlign: 'center',
            }}>
                <Title heading={6} style={{margin: '8px 0'}}>
                    <Text link={{href: 'https://semi.design/zh-CN/'}} icon={<IconSemiLogo/>}>Semi Design</Text>
                    <Divider layout="vertical" margin='15px'/>
                    <Text link={{href: 'https://github.com/stonebirdjx'}}
                          icon={<IconGithubLogo/>}>Github/stonebirdjx</Text>
                    <Divider layout="vertical" margin='15px'/>
                    <Text link={{href: 'https://pkg.go.dev/github.com/otiai10/gosseract'}} icon={<IconLanguage/>}>gosseract
                        OCR</Text>
                    <br/>
                    <Text type="warning"> 个人网站(无商业性质),侵删前往<Text link={{href: '/pc/story'}}>Story</Text>页SendMsg或邮件联系1245863260@qq.com
                    </Text>
                    <br/>
                    © 2021 Stone Bird Hu. All rights reserved. Version:2.0.1 Time:{this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}<Text
                    link={{href: 'http://beian.miit.gov.cn'}}>蜀ICP备2021003810号-1</Text>
                    <img src={beian} alt={'benan'}/><Text
                    link={{href: 'http://www.beian.gov.cn/portal/registerSystemInfo'}}>川公网安备 51172402000094号</Text>
                </Title>
            </div>
        )
    }
}

// http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51172402000094
export default MyFooter