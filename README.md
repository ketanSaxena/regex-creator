# Regex Creator

Regex Creator is a user-friendly web application that allows users to generate and test regular expressions (regex) with ease. Inspired by popular tools like regex101, this tool provides a streamlined interface for regex creation and testing, making it easier to validate and match patterns in strings.

## Features

- **Generate Regex**: Describe your validation needs, and the app will generate a regex pattern for you.
- **Real-time Testing**: Test your generated regex against input strings in real-time with instant feedback.
- **Copy to Clipboard**: Easily copy the generated regex to your clipboard for use in your projects.
- **Responsive Design**: The application is fully responsive, providing a seamless experience across devices.
- **Professional UI**: A clean and modern UI inspired by regex101, ensuring a professional look and feel.

## Technologies Used

- **Next.js**: React framework for server-side rendering and generating static websites.
- **TypeScript**: Superset of JavaScript for static type checking.
- **Material-UI (MUI)**: React UI framework for designing and implementing user interfaces.
- **MongoDB Atlas**: Cloud-based NoSQL database for storing and retrieving regex patterns.
- **OpenAI API**: Integration with OpenAI's GPT model to generate regex patterns based on user input.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- OpenAI API key

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/regex-creator.git
    cd regex-creator
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Create a `.env.local` file** in the root directory and add the following environment variables:
    ```plaintext
    MONGO_URL=your-mongodb-connection-string
    OPENAI_API_KEY=your-openai-api-key
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Usage

1. Enter your validation description in the provided text area.
2. Click "Generate Regex" or press enter to generate the regex pattern.
3. Test your generated regex by typing a string in the "Test your regex" input field.
4. Copy the generated regex to your clipboard using the copy icon for use in your projects.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Inspired by [regex101](https://regex101.com/)
- Built with [Next.js](https://nextjs.org/) and [Material-UI](https://mui.com/)

