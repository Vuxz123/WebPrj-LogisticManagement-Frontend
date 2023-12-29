import React, { useContext, useEffect, useRef, useState } from 'react';
import {Button, Divider, Form, Input, Popconfirm, Table} from 'antd';
const EditableContext = React.createContext(null);
const EditableRow = ({...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr  {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
                          title,
                          children,
                          dataIndex,
                          record,
                          editable,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

const type = {
    base: "Cước chính",
    extra: "Phụ phí",
    gtgt: "Cước GTGT",
    vat: "VAT",
    other: "Phí khác",
    total: "Tổng thu",
}

const ChargeTable = (props) => {
    const charge = props.shipment.charge;
    const key = Object.keys(charge);
    const value = Object.values(charge);
    let data = [];
    for(let i = 0; i < key.length; i++){
        data.push({
            key: i,
            type: type[key[i]],
            value: value[i],
        })
    }
    const [dataSource, setDataSource] = useState(data);
    const defaultColumns = [
        {
            title: 'Loại',
            dataIndex: 'type',
            width: '50%',
        },
        {
            title: 'Trị giá',
            dataIndex: 'value',
            width: '50%',
            editable: true,
        },
    ];
    const totalColumns = [
        {
            title: 'Loại',
            dataIndex: 'type',
            width: '50%',
        },
        {
            title: 'Trị giá',
            dataIndex: 'value',
            width: '50%',
        },
    ];
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        let keys = Object.keys(type);
        let values = Object.values(type);
        let c = {};
        let sum = 0;
        newData.forEach((item, index) => {
            c[keys[index]] = Number(item.value);
            if(index === newData.length - 1){
                c['total'] = sum;
            } else {
                sum += Number(item.value);
            }
        });
        newData[newData.length - 1]['value'] = sum;
        console.log(c);
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div style={
            {
                width: '100%',
            }
        }>
            <Table
                style={
                    {
                        width: '100%',
                    }
                }
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource.slice(0, dataSource.length - 1)}
                columns={columns}
                pagination={false}
            />
            <Divider/>
            <Table
                style={
                    {
                        width: '100%',
                    }
                }
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource.slice(dataSource.length - 1, dataSource.length)}
                showHeader={false}
                pagination={false}
                columns={totalColumns}
            />
        </div>
    );
};
export default ChargeTable;