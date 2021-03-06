import { Button } from "@react-components/button";
import { CloseIcon, MagnifierIcon } from "@react-components/icons";
import { Input } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Input"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Input />
    )
    .add("placeholder", () =>
        <Input placeholder="Where to?" />
    )
    .add("value", () =>
        <div className="flex">
            <Input value="SpaceX will win the race!" placeholder="Where to?" className="mr5" />
            <Input defaultValue="SpaceX will win the race!" placeholder="Where to?" />
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <Input icon={<MagnifierIcon />} placeholder="Where to?" className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" placeholder="Where to?" />
            </div>
            <div className="flex mb5">
                <Input defaultValue="SpaceX will win the race!" icon={<MagnifierIcon />} className="mr5" />
                <Input defaultValue="SpaceX will win the race!" icon={<MagnifierIcon />} iconPosition="left" />
            </div>
            <div className="flex mb5">
                <Input icon={<MagnifierIcon />} disabled placeholder="Where to?" className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" disabled placeholder="Where to?" />
            </div>
            <div className="flex mb5">
                <Input icon={<MagnifierIcon />} loading placeholder="Where to?" className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" loading placeholder="Where to?" />
            </div>
            <div className="flex items-end mb5">
                <Input size="small" icon={<MagnifierIcon />} placeholder="Where to?" className="mr5" />
                <Input icon={<MagnifierIcon />} placeholder="Where to?" className="mr5" />
                <Input size="large" icon={<MagnifierIcon />} placeholder="Where to?" className="mr5" />
            </div>
            <div className="flex items-end">
                <Input size="small" icon={<MagnifierIcon />} iconPosition="left" placeholder="Where to?" className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" placeholder="Where to?" className="mr5" />
                <Input size="large" icon={<MagnifierIcon />} iconPosition="left" placeholder="Where to?" className="mr5" />
            </div>
        </div>
    )
    .add("focus", () =>
        <Input focus placeholder="Where to?" />
    )
    .add("disabled", () =>
        <Input disabled placeholder="Where to?" />
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <Input size="small" loading placeholder="Where to?" className="mr5" />
                <Input loading placeholder="Where to?" className="mr5" />
                <Input size="large" loading placeholder="Where to?" />
            </div>
            <div className="flex items-end">
                <Input size="small" loading iconPosition="left" placeholder="Where to?" className="mr5" />
                <Input loading iconPosition="left" placeholder="Where to?" className="mr5" />
                <Input size="large" loading iconPosition="left" placeholder="Where to?" />
            </div>
        </div>
    )
    .add("fluid", () =>
        <div className="flex flex-column">
            <div className="mb5">
                <Input fluid placeholder="Where to?" />
            </div>
            <div className="w-10">
                <Input fluid placeholder="Where to?" />
            </div>
        </div>
    )
    .add("error", () =>
        <Input error placeholder="Where to?" />
    )
    .add("transparent", () =>
        <Input transparent placeholder="Where to?" />
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <Input placeholder="Where to?" size="small" className="mr5" />
                <Input placeholder="Where to?" className="mr5" />
                <Input placeholder="Where to?" size="large" />
            </div>
            <div className="flex items-end">
                <Input defaultValue="SpaceX will win the race!" size="small" className="mr5" />
                <Input defaultValue="SpaceX will win the race!" className="mr5" />
                <Input defaultValue="SpaceX will win the race!" size="large" />
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Input className="border-red mr5" />
            <Input style={{ border: "1px solid red" }} />
        </div>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/button")
    .add("element ref", () =>
        <Input button={<Button icon={<CloseIcon />} ref={setRedBackground} />} />
    )
    .add("object", () =>
        <div className="flex">
            <Input button={{ icon: <CloseIcon /> }} className="mr5" />
            <Input button={{ icon: <CloseIcon />, className: "bg-red" }} className="mr5" />
            <Input button={{ icon: <CloseIcon />, ref: setRedBackground }} />
        </div>
    )
    .add("disabled", () =>
        <Input button={<Button icon={<CloseIcon />} />} disabled />
    )
    .add("loading", () =>
        <div className="flex">
            <Input button={<Button icon={<CloseIcon />} />} loading className="mr5" />
            <Input icon={<CloseIcon />} loading className="mr5" />
            <Input icon={<CloseIcon />} loading iconPosition="left" />
        </div>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Input size="small" button={<Button icon={<CloseIcon />} />} className="mr5" />
            <Input button={<Button icon={<CloseIcon />} />} className="mr5" />
            <Input size="large" button={<Button icon={<CloseIcon />} />} />
        </div>
    );
