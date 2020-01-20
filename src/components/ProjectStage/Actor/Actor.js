import OperationsBase from 'components/ProjectStage/OperationsBase';
import {OperationRPC} from 'rpc';

export default class Actor extends OperationsBase {

    operationRPC(id) {
        return OperationRPC.getActor(id);
    }

    operationCaptions() {
        return {
            typeCaption: 'Исполнитель',
            selector: 'Выбрать исполнителя'
        }
    }
}