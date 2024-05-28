async function ReceiveResult(req, res) {
    const { success, completionText } = req.body;
    try {
      if (success) {
        console.log(`Received completion text: ${completionText}`);
        res.json({ success: true, message: 'Result received successfully.', completionText });
      } else {
        res.status(500).json({ success: false, message: 'Failed to receive result.' });
      }
    } catch (error) {
      console.error('Error in ReceiveResult:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
  
  module.exports = { ReceiveResult };
  