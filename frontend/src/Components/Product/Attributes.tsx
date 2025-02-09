import React from "react";

import type { CartAttributesProps } from "../../types/cart";

import { kebabCase } from "../../utils/helpers";

const Attributes: React.FC<CartAttributesProps> = ({
  productId,
  attributes = [],
  onAttributeSelection,
  customClass,
}) => {
  const groupedAttributes = attributes.map((attribute) => {
    const seenValues = new Set<string>();
    const uniqueItems = (attribute.items || []).filter((item) => {
      if (!seenValues.has(item.value)) {
        seenValues.add(item.value);
        return true;
      }
      return false;
    });

    return { ...attribute, items: uniqueItems };
  });

  return (
    <div className="mt-1 space-y-1">
      {groupedAttributes.map((attribute) => {
        const items = attribute.items || [];
        const selectedItem = items.find((item) => item.selected);
        const selectedValue = selectedItem?.value;

        return (
          <div key={attribute.name}>
            <span className="attribute-name text-lg font-semibold text-black">
              {attribute.name}:
            </span>
            <div className="flex items-center flex-wrap gap-2 mt-1">
              {items.map((item) => {
                const isSelected = item.value === selectedValue;

                const testId = `cart-item-attribute-${kebabCase(
                  attribute.name
                )}-${kebabCase(attribute.name)}${
                  isSelected ? "-selected" : ""
                }`;


                if (attribute.type === "swatch" && attribute.name === "Color") {
                  const isWhite =
                    item.value.toLowerCase() === "#ffffff" ||
                    item.value.toLowerCase() === "white";

                  return (
                    <div
                      key={item.id}
                      data-testid={testId}
                      onClick={() =>
                        onAttributeSelection(
                          productId,
                          attribute.name,
                          item.value
                        )
                      }
                      style={{
                        width: "30px",
                        height: "30px",
                        border: `2px solid ${
                          isSelected ? "#5ECE7B" : "transparent"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "border 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: item.value,
                          width: isSelected ? "20px" : "16px",
                          height: isSelected ? "20px" : "16px",
                          border:
                            isWhite && !isSelected
                              ? "1px solid lightgray"
                              : "none",
                        }}
                        className="attribute-color"
                      />
                    </div>
                  );
                }

                return (
                  <span
                    key={item.id}
                    data-testid={testId}
                    className={`attribute-item text-xs font-semibold mb-4 cursor-pointer relative border-2 border-black ${
                      typeof customClass === "function"
                        ? customClass(attribute.name, item.value)
                        : isSelected
                        ? "bg-black text-white"
                        : "bg-transparent text-black"
                    } px-2 py-1`}
                    onClick={() =>
                      onAttributeSelection(
                        productId,
                        attribute.name,
                        item.value
                      )
                    }
                  >
                    {item.value}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Attributes;
