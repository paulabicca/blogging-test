import React from "react";
import "@testing-library/jest-dom";
import { Author, Comment, Post } from "../types/Posts";
import { FormatTimestamp } from "../utils/FormatTimestamp";
import { User, UserPost } from "../types/Users";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "../components/Modal";
import ReplyTextarea from "../components/ReplyTextarea";

/*FormatTimestamp*/
describe("FormatTimestamp", () => {
  it("should format the timestamp correctly", () => {
    const timestamp = "2019-02-20T13:22Z";
    const formattedDate = FormatTimestamp(timestamp);

    expect(formattedDate).toBe("20 de fev, 2019");
  });

  it('should return "Data não disponível" for an undefined timestamp', () => {
    const formattedDate = FormatTimestamp(undefined);

    expect(formattedDate).toBe("Data não disponível");
  });
});

/*Data Structure Validation*/
describe("Posts.ts Structure Validation", () => {
  it("should have a correct Author structure", () => {
    const author: Author = {
      id: 1,
      username: "testuser",
    };

    expect(author).toEqual({
      id: expect.any(Number),
      username: expect.any(String),
    });
  });

  it("should have a correct Comment structure", () => {
    const comment: Comment = {
      id: 1,
      respondsTo: null,
      author: {
        id: 1,
        username: "testuser",
      },
      timestamp: "2020-01-01T00:00:00Z",
      content: "This is a comment",
      replies: [],
    };

    expect(comment).toEqual({
      id: expect.any(Number),
      respondsTo: expect.any(Object),
      author: {
        id: expect.any(Number),
        username: expect.any(String),
      },
      timestamp: expect.any(String),
      content: expect.any(String),
      replies: expect.any(Array),
    });
  });

  it("should have a correct Post structure", () => {
    const post: Post = {
      id: 1,
      timestamp: "2020-01-01T00:00:00Z",
      author: {
        id: 1,
        username: "testuser",
      },
      title: "Test Title",
      subtitle: "Test Subtitle",
      content: "Test Content",
      comments: [
        {
          id: 1,
          respondsTo: null,
          author: {
            id: 1,
            username: "testuser",
          },
          timestamp: "2020-01-01T00:00:00Z",
          content: "This is a comment",
          replies: [],
        },
      ],
    };

    expect(post).toEqual({
      id: expect.any(Number),
      timestamp: expect.any(String),
      author: {
        id: expect.any(Number),
        username: expect.any(String),
      },
      title: expect.any(String),
      subtitle: expect.any(String),
      content: expect.any(String),
      comments: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          respondsTo: expect.any(Object),
          author: {
            id: expect.any(Number),
            username: expect.any(String),
          },
          timestamp: expect.any(String),
          content: expect.any(String),
          replies: expect.any(Array),
        }),
      ]),
    });
  });
});

describe("Users.ts Structure Validation", () => {
  it("should have a correct Post structure", () => {
    const post: UserPost = {
      id: 1,
      title: "Sample Title",
      subtitle: "Sample Subtitle",
      content: "Sample Content",
    };

    expect(post).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      subtitle: expect.any(String),
      content: expect.any(String),
    });
  });

  it("should have a correct User structure", () => {
    const user: User = {
      id: 1,
      username: "testuser",
      memberSince: "2020-01-01",
      friendIds: [2, 3],
      posts: [
        {
          id: 1,
          title: "Sample Post Title",
          subtitle: "Sample Post Subtitle",
          content: "Sample Post Content",
        },
      ],
    };

    expect(user).toEqual({
      id: expect.any(Number),
      username: expect.any(String),
      memberSince: expect.any(String),
      friendIds: expect.arrayContaining([expect.any(Number)]),
      posts: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          subtitle: expect.any(String),
          content: expect.any(String),
        }),
      ]),
    });
  });
});

/*Modal*/
describe("Modal Validation", () => {
  it("should render trigger", () => {
    render(
      <Modal
        id="test-modal"
        title="Test Modal"
        content={<div>Modal Content</div>}
        trigger={<button>Open Modal</button>}
      />
    );

    expect(screen.getByText("Open Modal")).toBeInTheDocument();
  });

  it("should render modal content correctly", () => {
    render(
      <Modal
        id="test-modal"
        title="Test Modal"
        content={<div>Modal Content</div>}
        trigger={<button>Open Modal</button>}
      />
    );

    fireEvent.click(screen.getByText("Open Modal"));

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });
});

/*ReplyTextarea*/
describe("ReplyTextarea Validation", () => {
  it("should render ReplyTextarea with correct placeholder and button text", () => {
    render(
      <ReplyTextarea
        value="Initial value"
        message="Digite sua mensagem"
        onChange={() => {}}
        onSave={() => {}}
      />
    );

    expect(
      screen.getByPlaceholderText("Digite sua mensagem")
    ).toBeInTheDocument();

    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

  it("should call onChange when textarea value changes", () => {
    const handleChange = jest.fn();
    render(
      <ReplyTextarea
        value="Initial value"
        message="Digite sua mensagem"
        onChange={handleChange}
        onSave={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Digite sua mensagem"), {
      target: { value: "New value" },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it("should onSave when the save button is clicked", () => {
    const handleSave = jest.fn();
    render(
      <ReplyTextarea
        value="Initial value"
        message="Digite sua mensagem"
        onChange={() => {}}
        onSave={handleSave}
      />
    );

    fireEvent.click(screen.getByText("Salvar"));

    expect(handleSave).toHaveBeenCalled();
  });
});
