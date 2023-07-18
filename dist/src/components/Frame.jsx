"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const tdesign_react_1 = require("tdesign-react");
const SideNavbar_1 = __importDefault(require("./SideNavbar"));
const PlayBar_1 = __importDefault(require("./PlayBar"));
const Frame = (props) => {
    const { children } = props;
    const { Content, Footer, Aside } = tdesign_react_1.Layout;
    /** state **/
    /** effect **/
    /** methods **/
    /** render **/
    return (<>
      <tdesign_react_1.Layout>
        <Aside>
          <SideNavbar_1.default></SideNavbar_1.default>
        </Aside>
        <tdesign_react_1.Layout>
          <Content>
            <div>{children}</div>
          </Content>
          <Footer>Copyright @ 2019-2020 Tencent. All Rights Reserved</Footer>
        </tdesign_react_1.Layout>
      </tdesign_react_1.Layout>
      <PlayBar_1.default />
    </>);
};
exports.default = Frame;
//# sourceMappingURL=Frame.jsx.map