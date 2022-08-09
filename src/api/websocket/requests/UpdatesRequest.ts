import { App } from "@root/LauncherServer"

import { RequestData } from "../types/Request"
import { ResponseData } from "../types/Response"
import { AbstractRequest } from "./AbstractRequest"

export class UpdatesRequest extends AbstractRequest {
    type = "updates"

    invoke(data: UpdatesRequestData): ResponseData {
        return {
            hashes: App.UpdatesManager.hashDirs.get(data.dir),
        }
    }
}

interface UpdatesRequestData extends RequestData {
    dir: string
}
