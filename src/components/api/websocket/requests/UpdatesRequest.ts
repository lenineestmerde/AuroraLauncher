import { App } from "@root/app"
import { AbstractRequest, ResponseResult } from "aurora-rpc-server"

export class UpdatesRequest extends AbstractRequest {
    method = "updates"

    invoke(data: UpdatesRequestData): ResponseResult {
        return App.InstancesManager.hashedDirs.get(data.dir)
    }
}

interface UpdatesRequestData {
    dir: string
}
