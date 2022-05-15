import {
    Navigate,
    Routes,
    Route,
} from "react-router-dom";
import PcPrimary from "./pages/pc/primary/primary";
import PcStory from "./pages/pc/story/story";
import PcMedia from "./pages/pc/media/media";
import PcCode from "./pages/pc/code/code";
import PcOcr from "./pages/pc/ocr/ocr";
import PcQr from "./pages/pc/qr/qr";
import PcResume from "./pages/pc/resume/resume";
import MobilePrimary from "./pages/mobile/primary/primary";
import NoRoute from "./pages/noroute/noroute";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={isMobile() ? <Navigate to="mobile"/> : <Navigate to="pc/story"/>}/>
                {/* pc router handlers*/}
                <Route path="/mobile" element={<MobilePrimary/>}/>
                <Route path="/pc" element={<PcPrimary/>}>
                    <Route path="story" element={<PcStory/>}/>
                    <Route path="media" element={<PcMedia/>}/>
                    <Route path="code" element={<PcCode/>}/>
                    <Route path="ocr" element={<PcOcr/>}/>
                    <Route path="qr" element={<PcQr/>}/>
                    <Route path="resume" element={<PcResume/>}/>
                </Route>
                {/*<Route path="/pc/primary" element={<PcPrimary/>}/>*!/*/}
                <Route path="*" status={404} element={<NoRoute/>}/>
            </Routes>
        </>
    );
}

// isMobile Determine whether it is a mobile request.
function isMobile() {
    return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
}

export default App;
