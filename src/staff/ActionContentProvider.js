import {Dropdown, Menu} from "antd";
import React from "react";
import staffFeatures from './staff_feature.json';
import {ReactNode} from "react";

function importAll(r) {
    let modules = new Map();
    r.keys().forEach((key) => (modules.set(key, r(key))));
    return modules;
}

const modules = importAll(require.context('./ac/', true, /\.js$/));

class ActionContentProvider {
    constructor() {
        this.staffFeatures = staffFeatures;
    }
    getMenuContent(role, handleMenuClick): ReactNode {
        // Render menu items based on role
        if (this.staffFeatures[role] !== undefined) {
            let features = this.staffFeatures[role];
            let menuItems = features.map((feature) => {
                return (
                    <Menu.Item key={feature.key} onClick={handleMenuClick}>
                        {feature.name}
                    </Menu.Item>
                );
            });
            let dropdown = features.map((feature) => {
                return (
                    <Dropdown.Button key={feature.key} onClick={handleMenuClick}>
                        {feature.name}
                    </Dropdown.Button>
                );
            })
            let firstKey = features[0].key;
            return {
                dropdown: dropdown,
                menuItems: menuItems,
                firstKey: firstKey,
            };
        }
        return null;
    }

    renderActionContent(role : String, selectedAction : String) : ReactNode {
        const module = this.importActionContentModule(role, selectedAction);
        if(module !== undefined) {
            return module.default;
        } else {
            console.log('Module not found: Cannot render the action : \'' + selectedAction + '\' for role: \'' + role + '\'');
            throw new Error('Module not found: Cannot render the action : \'' + selectedAction + '\' for role: \'' + role + '\'');
        }
    }

    importActionContentModule(role : String, selectedAction : String) : NodeModule {
        const features = this.staffFeatures[role];
        const className : String = features.find((feature) => feature.key === selectedAction).node;
        if(className === undefined) {
            console.log('WARNING: the node is undefined of action : \'' + selectedAction + '\' for role: \'' + role + '\'')
            return modules.get('./PlaceHolder.js');
        }
        const path : String = './' + role + '/' + className + '.js';
        if(modules.has(path)) {
            return modules.get(path);
        }else {
            console.log('Module not found: Cannot render the action : \'' + selectedAction + '\' for role: \'' + role + '\'');
            return modules.get('./PlaceHolder.js');
        }
    }
}

export default ActionContentProvider;