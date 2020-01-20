import OperationsBase from 'components/ProjectStage/OperationsBase';
import {OperationRPC} from 'rpc';

export default class Action extends OperationsBase {

    operationRPC(id) {
        return OperationRPC.getAction(id);
    }

    operationCaptions() {
        return {
            typeCaption: 'Действие',
            selector: 'Выбрать действие'
        }
    }
}