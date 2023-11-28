import {Menu} from "antd";
import React from "react";
import staffFeatures from './staff_feature.json';
import {ReactNode} from "react";

function importAll(r) {
    let modules = new Map();
    r.keys().forEach((key) => (modules.set(key, r(key))));
    return modules;
}

const modules = importAll(require.context('./ac/', true, /\.js$/));

console.log(modules)

class ActionContentProvider {
    constructor() {
        this.staffFeatures = staffFeatures;
    }
    getMenuContent(role, handleMenuClick) {
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
            let firstKey = features[0].key;
            return {
                menuItems: menuItems,
                firstKey: firstKey,
            };
        }
        return null;
    }

    renderActionContent(role : String, selectedAction : String) : ReactNode {
        return this.importActionContentModule(role, selectedAction).default;
    }

    importActionContentModule(role : String, selectedAction : String) : NodeModule {
        const features = this.staffFeatures[role];
        const className : String = features.find((feature) => feature.key === selectedAction).node;
        const path : String = './' + role + '/' + className + '.js';
        if(modules.has(path)) {

            return modules.get(path);

        }else {
            console.log('Module not found: ' + path);
            throw new Error('Module not found: ' + path);
        }
    }
}

export default ActionContentProvider;