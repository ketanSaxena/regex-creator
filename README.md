# Regex Creator - Powered by ChatGPT AI

Regex Creator is a web application that leverages the power of OpenAI's ChatGPT to generate regular expressions (regex) based on natural language descriptions. Whether you're a developer, data scientist, or just someone looking to validate text patterns, Regex Creator makes it easy to generate and test complex regex patterns with minimal effort.
### [Online Demo - Regex Creator](https://regex-creator.vercel.app/)

## Key Features

- **AI-Powered Regex Generation**: Describe your desired text pattern in plain English, and Regex Creator will generate the corresponding regex using OpenAI's ChatGPT model.
- **Real-Time Regex Testing**: Test your generated regex against sample strings in real-time to ensure it works as expected.
- **Copy to Clipboard**: Quickly copy the generated regex to your clipboard for use in your projects with just a click.
- **Professional UI**: A clean and modern user interface inspired by popular tools like regex101, providing a seamless user experience.
- **Responsive Design**: Optimized for use on any device, whether you're on a desktop or mobile.

## Technologies Used

- **Next.js**: A powerful React framework for server-side rendering and static site generation.
- **Vercel**: Hosted with Vercel using SSR react app and serverless server methods
- **TypeScript**: Ensures type safety and improved developer experience.
- **Material-UI (MUI)**: A popular React UI framework for building modern and responsive user interfaces.
- **MongoDB Atlas**: A cloud-based NoSQL database for storing and retrieving regex patterns.
- **OpenAI GPT**: The core AI model used to generate regex patterns from natural language descriptions.

## How It Works

1. **Natural Language Input**: Users input a natural language description of the validation pattern they need (e.g., "only allow alphanumeric characters").
2. **ChatGPT AI Processing**: The application sends the description to OpenAI's ChatGPT API, which generates the corresponding regex pattern.
3. **Regex Generation**: The generated regex is returned and displayed on the interface for immediate testing and usage.
4. **Real-Time Feedback**: Users can input test strings to see if they match the generated regex in real-time, with immediate visual feedback.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- OpenAI API key

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ketanSaxena/regex-creator.git
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

1. **Enter Description**: Type your validation description in plain English.
2. **Generate Regex**: The AI processes your input and generates the appropriate regex pattern.
3. **Test Regex**: Use the test string input to verify the regex's functionality.
4. **Copy and Use**: Easily copy the regex to your clipboard for use in your projects.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Powered by [OpenAI GPT](https://beta.openai.com/)
- Inspired by [regex101](https://regex101.com/)
- Built with [Next.js](https://nextjs.org/) and [Material-UI](https://mui.com/)
