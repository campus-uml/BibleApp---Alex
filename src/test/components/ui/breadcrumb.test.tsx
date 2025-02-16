import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";

describe("Breadcrumb Component", () => {
  test("should render Breadcrumb component", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });


    test("should render Breadcrumb component with custom separator", () => {
        render(
        <Breadcrumb separator={<span> / </span>}>
            <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        );
    
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Product")).toBeInTheDocument();
        
    });


});
