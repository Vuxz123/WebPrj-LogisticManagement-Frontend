interface ShipmentProf {
    id?: string,
    sender: {
        name: string,
        phone: string,
        address: string,
    },
    receiver: {
        name: string,
        phone: string,
        address: string,
    },
    type: string,
    content: {
        quantity: number,
        value: number,
        currency: string,
        document: boolean,
    },
    special: string,
    guide: number,
    weight: {
        value: number,
        unit: string,
    },
    shipmentDate: Date,
    charge: {
        base: number,
        extra: number,
        gtgt: number,
        vat: number,
        other: number,
        total: number,
    },
    isReceiverPay: boolean,
    receiverPay: {
        cod: number,
        extra: number,
        total: number,
    },
    receivedDate: Date,
    isSuccessful: boolean,
}

class Shipment implements ShipmentProf{
    constructor() {
        this.id = null;
        this.sender = {
            name: '',
            phone: '',
            address: '',
        };
        this.receiver = {
            name: '',
            phone: '',
            address: '',
        };
        this.type = '';
        this.content = {
            quantity: 0,
            value: 0,
            currency: 'VND',
            document: false,
        };
        this.special = '';
        this.guide = 0;
        // <Radio value={1}>Chuyển hoàn ngay</Radio>
        // <Radio value={2}>Chuyển hoàn trước ngày</Radio>
        // <Radio value={3}>Gọi điện cho người gưửi/BC gửi</Radio>
        // <Radio value={4}>Chuyển hoàn khi hết thời gian lưu trữ</Radio>
        // <Radio value={5}>Huỷ</Radio>
        this.weight = {
            value: 0,
            unit: 'kg',
        };
        this.shipmentDate = null;
        this.charge = {
            base: 0,
            extra: 0,
            gtgt: 0,
            vat: 0,
            other: 0,
            total: 0,
        };
        this.isReceiverPay = false;
        this.receiverPay = {
            cod: 0,
            extra: 0,
            total: 0,
        };
        this.receivedDate = null;
        this.isSuccessful = false;
    }

    checkValidSubmit(): boolean {
        if (this.sender.name === '' || this.sender.phone === '' || this.sender.address === '') {
            console.log('sender')
            return false;
        }
        if (this.receiver.name === '' || this.receiver.phone === '' || this.receiver.address === '') {
            console.log('receiver')
            return false;
        }
        if (this.type === '') {
            console.log('type')
            return false;
        }
        if (this.content.quantity === 0 || this.content.value === 0) {
            console.log('content')
            return false;
        }
        if (this.weight.value === 0) {
            console.log('weight')
            return false;
        }
        if (this.shipmentDate === null) {
            console.log('date')
            return false;
        }
        return true;

    }
}

export default Shipment;