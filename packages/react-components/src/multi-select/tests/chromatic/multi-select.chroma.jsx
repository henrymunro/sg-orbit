import { AddIcon } from "@react-components/icons";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE } from "@react-components/multi-select/stories/data";
import { MultiSelect } from "@react-components/multi-select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { noop } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Multi Select"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function createMultiSelect({ items = DEFAULT_ITEMS, ...otherProps } = {}) {
    return <MultiSelect
        items={items}
        onValuesChange={noop}
        {...otherProps}
    />;
}

stories()
    .add("size",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     { createMultiSelect({
                         size: "small",
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     { createMultiSelect({
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
                 <div className="flex">
                     { createMultiSelect({
                         size: "large",
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
             </div>
    );

stories("/dropdown")
    .add("some items",
         () =>
             createMultiSelect({
                 defaultOpen: true
             })
    )
    .add("no items",
         () =>
             createMultiSelect({
                 items: [],
                 defaultOpen: true
             })
    )
    .add("categories",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS_WITH_CATEGORIES,
                 defaultOpen: true
             })
    );

stories("/selected values")
    .add("no selection",
         () =>
             createMultiSelect()
    )
    .add("some values selected",
         () =>
             createMultiSelect({
                 values: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createMultiSelect({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/selected values/clear button")
    .add("can clear when all values selected",
         () =>
             createMultiSelect({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    )
    .add("cannot clear when no selection",
         () =>
             createMultiSelect({
                 values: []
             })
    );

stories("/selected values/add button")
    .add("can add when no selection",
         () =>
             createMultiSelect({
                 values: []
             })
    )
    .add("can add when all values selected",
         () =>
             createMultiSelect({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/default values")
    .add("some values selected",
         () =>
             createMultiSelect({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createMultiSelect({
                 defaultValues: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/disabled")
    .add("values selected",
         () =>
             createMultiSelect({
                 disabled: true
             })
    )
    .add("no selection",
         () =>
             createMultiSelect({
                 defaultValues: [GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE],
                 disabled: true
             })
    );

stories("/customization")
    .add("dropdown",
         () =>
             createMultiSelect({
                 dropdown: <MultiSelect.Dropdown className="bg-red border-red" />
             })
    )
    .add("no results message",
         () =>
             createMultiSelect({
                 items: [],
                 noResultsMessage: "Custom no results message",
                 defaultOpen: true
             })
    )
    .add("add text",
         () =>
             createMultiSelect({
                 addText: "Custom add text"
             })
    )
    .add("trigger", () =>
        createMultiSelect({
            dropdown: <MultiSelect.Dropdown trigger={<MultiSelect.Trigger className="bg-red" />} />
        })
    )
    .add("trigger icon",
         () =>
             createMultiSelect({
                 dropdown: <MultiSelect.Dropdown triggerIcon={<AddIcon className="fill-red" />} />
             })
    )
    .add("search input",
         () =>
             createMultiSelect({
                 dropdown: <MultiSelect.Dropdown searchInput={<MultiSelect.SearchInput className="bg-red border-red" />} />,
                 defaultOpen: true
             })
    )
    .add("placeholder",
         () =>
             createMultiSelect({
                 placeholder: "Custom placeholder",
                 defaultOpen: true
             })
    )
    .add("selected items components",
         () =>
             createMultiSelect({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <MultiSelect.SelectedItems className="bg-red border-red" />
             })
    )
    .add("selected item renderer",
         () =>
             createMultiSelect({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <MultiSelect.SelectedItems itemRenderer={item => <div>{item.text}</div>} />
             })
    )
    .add("clear button",
         () =>
             createMultiSelect({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <MultiSelect.ClearButton className="bg-red" />
             })
    )
    .add("clear text",
         () =>
             createMultiSelect({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <MultiSelect.ClearButton text="Custom clear text" />
             })
    )
    .add("styling", () =>
        <div className="flex">
            {createMultiSelect({
                defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                className: "bg-red mr5"
            })}
            {createMultiSelect({
                defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                style: { backgroundColor: "red" }
            })}
        </div>
    );