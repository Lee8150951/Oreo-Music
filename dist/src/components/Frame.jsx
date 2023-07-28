"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const tdesign_react_1 = require("tdesign-react");
const TopNavbar_1 = __importDefault(require("./TopNavbar"));
const SideNavbar_1 = __importDefault(require("./SideNavbar"));
const PlayBar_1 = __importDefault(require("./PlayBar"));
require("../style/components/Frame.scss");
const Frame = (props) => {
    const { children } = props;
    const { Content, Aside } = tdesign_react_1.Layout;
    /** state **/
    /** effect **/
    /** methods **/
    /** render **/
    return (<>
      <tdesign_react_1.Layout>
        <Aside className={'aside'}>
          <SideNavbar_1.default></SideNavbar_1.default>
        </Aside>
        <tdesign_react_1.Layout className={'layout'}>
          <Content>
            <div className={'header'}>
              <TopNavbar_1.default />
            </div>
            <div className={'content'}>{children}</div>
          </Content>
        </tdesign_react_1.Layout>
      </tdesign_react_1.Layout>
      <div className={'footer'}>
        <PlayBar_1.default />
      </div>
    </>);
};
exports.default = Frame;
//# sourceMappingURL=Frame.jsx.map