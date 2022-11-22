import { App } from "@root/LauncherServer"

import { WebRequest } from "../../../WebRequest"
import { WebResponse } from "../../../WebResponse"
import { AbstractRequest } from "../../AbstractRequest"

export class ProfileRequest extends AbstractRequest {
    method = "GET"
    url =
        /^\/authlib\/sessionserver\/session\/minecraft\/profile\/(?<uuid>\w{32})(\?unsigned=(true|false))?$/

    async emit(req: WebRequest, res: WebResponse): Promise<void> {
        const matches = req.raw.url.match(this.url)
        const uuid = matches.groups.uuid
        const signed = matches[3] === "false"

        let user
        try {
            user = await App.AuthManager.getAuthProvider().profile(uuid)
        } catch (error) {
            res.raw.statusCode = 204
            res.raw.end()
            return
        }

        const textures: any = {}
        if (user.skinUrl?.length > 0) {
            textures.SKIN = {
                url: user.skinUrl,
            }
        }
        if (user.capeUrl?.length > 0) {
            textures.CAPE = {
                url: user.capeUrl,
            }
        }

        let texturesValue: any = {
            timestamp: Date.now(),
            profileId: uuid,
            profileName: user.username,
            textures,
        }

        const data: any = {
            id: uuid,
            name: user.username,
            properties: [
                {
                    name: "textures",
                    value: "",
                },
            ],
        }

        if (signed) texturesValue.signatureRequired = true
        texturesValue = Buffer.from(JSON.stringify(texturesValue))
        data.properties[0].value = texturesValue.toString("base64")
        if (signed)
            data.properties[0].signature =
                App.AuthlibManager.getSignature(texturesValue)
        res.sendJson(data)
    }
}
