import {Request, Response, Router} from "express";
import { logger } from "../logger";
import { sendNotification } from "../notifications/firebase";
import supabase from "../db/supabase";

const router = Router();

router.post("/hook", async(req: Request, res: Response)=>{
logger.info("RECEIVED")
    const requestBody = req.body;

    console.log('Received a hook request:');
    // console.log(JSON.stringify(requestBody));

    const webhookData = JSON.parse(JSON.stringify(requestBody));
    const logs = webhookData[0].meta.logMessages;

    // console.log(logs);

    const programId = logs[0].split(" ")[1]
    // console.log(programId);

    if(programId !=="FwsAUMA78s66U2LSrEmRWeSP4zdqc3yuz1gH1zndZ6cq") {
        return res.status(200).json({ message: 'Hook request received successfully.' });
    }

    let logData = null;
    for(let i=0;i<logs.length;i++){
        if(`${logs[i]}`.match(/EmitEvent/) && `${logs[i+2]}`.match(/Event Emitted/)){
            logData = `${logs[i+1]}`.split(":")[1].trim()
        }
    }

    // console.log(logData);
    // console.log(Buffer.from(logData, 'base64').toString('utf-8').trim().match(/\{.*\}/)[0]);

    const messageData = Buffer.from(logData!, 'base64').toString('utf-8').trim().match(/\{.*\}/)![0];
    // console.log(JSON.parse(messageData));

    const messageDataParsed = JSON.parse(messageData);
    logger.info(JSON.stringify(messageDataParsed))

    const message = {
        notification: {
          body: JSON.stringify(messageDataParsed.data),
          title: messageDataParsed.data.title,
        },
        topic: messageDataParsed.label
      };
    
    const dbRes = await supabase.from("notifications").insert({
        project_id:"lk7e0p",
        topic:  messageDataParsed.label,
        notif: JSON.stringify(messageDataParsed.data)
    })
    logger.info(JSON.stringify(dbRes))

    await sendNotification(message)

    res.status(200).json({ message: 'Hook request received successfully.' });

})


export default router;