import {useRouter} from "next/router";
import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Modal from "@/components/specific/changelogs/Modal";
import classes from "./styles.module.css";
import cross from "@/icons/cross.svg";
import Image from "next/image";
import React from "react";
import api from "@/helpers/api";
import MarkdownLog from "@/components/specific/changelogs/MarkdownLog";

export default function ChangelogLayout() {
    const router = useRouter();
    const [markdownLogs, setMarkdownLogs] = React.useState<string[]>([]);

    function close() {
        router.push({
            query: {
                ...router.query,
                modal_type: undefined,
            }
        }, undefined, {
            shallow: true,
        }).then();
    }

    async function fetchLogs() {
        const logs = (await api.get<string[]>("/changelogs")).data;
        setMarkdownLogs(logs);
    }

    React.useEffect(() => {
        fetchLogs().then();
    }, []);

    return <FullScreenOverlayWithCenteredItem opaqueBackdrop={false} onOuterClick={e => {
        close();
    }}>
        <Modal>
            <div className={classes.header}>
                <h1 className={classes.heading}>What&apos;s new?</h1>
                <button onClick={close}><Image src={cross} alt={"Close"} title={"Close"}/>
                </button>
            </div>
            <ul className={classes.changelogContainer}>
                {markdownLogs.map((item, index) => {
                    return <li key={index}>
                        <MarkdownLog data={item}></MarkdownLog>
                    </li>;
                })}
            </ul>
        </Modal>
    </FullScreenOverlayWithCenteredItem>;
}