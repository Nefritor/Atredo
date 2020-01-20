import OperationsBase from 'components/ProjectStage/OperationsBase';
import {OperationRPC} from 'rpc';

export default class Object extends OperationsBase {

    operationRPC(id) {
        return OperationRPC.getObject(id);
    }

    operationCaptions() {
        return {
            typeCaption: 'Объект',
            selector: 'Выбрать объект'
        }
    }
}