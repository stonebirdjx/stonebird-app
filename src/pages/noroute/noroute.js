import { Card ,Button } from '@douyinfe/semi-ui';
import WaterMark from 'watermark-component-for-react';

function NoRoute() {
    const content = `stone bird`;
    return (
        <WaterMark rotate={-16} content={content} fillStyle={'red'}>
            <div   style={{
                width:window.innerWidth,
                height:window.innerHeight,
                backgroundColor:'var(--semji-color-bg-0)'
            }} >
                <div
                    style={{
                        display: 'inline-block',
                        padding: 20,
                        margin:window.innerHeight/4,
                        backgroundColor: 'var(--semi-color-fill-0)'
                    }}
                >
                    <Card
                        style={{
                            width: window.innerWidth/2,
                           }}
                        bordered={false}
                        headerLine={true}
                        title='God has no route'
                        footer = {
                            <Button  size='large' theme='solid' type='primary' onClick={goRoot}>返回主页</Button>
                        }
                    >
                        <p>我们的人生时常会迷失方向,但只要冷静下来思考自己就能迷途知返。你知道该怎么做
                        <br/>
                        ↓↓↓↓ </p>
                    </Card>
                </div>

            </div>
        </WaterMark>
    );
}


function goRoot() {
    window.location.href="/";
}

export default NoRoute